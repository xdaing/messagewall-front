<script setup lang="ts">
import { ref } from 'vue'
import { useVisitorStore } from '@/stores/visitor'
import { createPhoto } from '@/api/photo'
import { createMessage } from '@/api/message'
import { notice } from '@/components/Notice'
import Button from './Button.vue'
import SvgIcon from './SvgIcon.vue'

const props = defineProps<{
    labels: Array<string>,
    type: 'message' | 'photo'
}>()
const emits = defineEmits<{ (e: 'close'): void, (e: 'refresh', card: Card): void }>()
const visitorStore = useVisitorStore()
const colors: Array<string> = [
    'rgba(252,175,162,0.30)',
    'rgba(255,227,148,0.30)',
    'rgba(146,230,245,0.30)',
    'rgba(168,237,138,0.30)',
    'rgba(202,167,247,0.30)',
]
const selectColor = ref<number>(0)
const selectLabel = ref<number>(0)
const content = ref<string>('')
const name = ref<string>('')
const imageFile = ref<HTMLInputElement | null>(null)
const imagePreviewURL = ref<string>('')

// 图片预览
const uploadImagePreview = (event: Event) => {
    if (event.target) {
        const file = (event.target as HTMLInputElement).files![0]
        if (file) {
            const imgFile: FileReader = new FileReader()
            imgFile.readAsDataURL(file)
            imgFile.onload = ({ target }) => {
                imagePreviewURL.value = target?.result as string
            }
        }
    }
}
// 创建新留言
const newMessageCard = async (name: string) => {
    const createCard: CreateCard = {
        visitorId: visitorStore.visitorId,
        avatar: visitorStore.avatarColor,
        name,
        content: content.value,
        label: selectLabel.value,
        color: colors[selectColor.value]
    }
    const response: MyResponse<Card> = await createMessage<CreateCard, Card>(createCard)
    if (response.state === 200) {
        emits('refresh', response.data)
        emits('close')
        notice.success('留言成功')
    }
}
// 创建新图片
const newPhotoCard = async (name: string) => {
    const formData = new FormData()
    if (imageFile.value?.files![0]) {
        formData.append('visitorId', visitorStore.visitorId)
        formData.append('file', imageFile.value.files![0])
        formData.append('content', content.value)
        formData.append('name', name)
        formData.append('label', selectLabel.value.toString())
        formData.append('avatar', visitorStore.avatarColor)
        const response: MyResponse<Card> = await createPhoto<FormData, Card>(formData)
        if (response.state === 200) {
            emits('refresh', response.data)
            emits('close')
            notice.success('添加成功')
        }
    } else notice.warn('图片不能为空')
}
// 提交创建
const submit = () => {
    if (content.value.trim() === '') notice.warn('内容不能为空')
    else {
        const defaultName: string = name.value.trim() || '匿名'
        if (props.type === 'message') newMessageCard(defaultName)
        else newPhotoCard(defaultName)
    }
}
</script>
<template>
    <div class="newCard">
        <div class="colors" v-if="type === 'message'">
            <p class="color" v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }"
                :class="{ 'selected-color': selectColor === index }" @click="selectColor = index"></p>
        </div>
        <div v-else class="photo">
            <input class="file" type="file" accept=".jpg,.jpeg,.png" ref="imageFile" @change="uploadImagePreview">
            <div class="add-button" v-if="imagePreviewURL === ''">
                <SvgIcon name="add" class="icon-add"></SvgIcon>
            </div>
            <div class="change-button" v-else>
                <SvgIcon name="edit" class="icon-edit" color="#f6f6f8"></SvgIcon>
            </div>
            <div class="photo-container">
                <img :src="imagePreviewURL">
            </div>
        </div>
        <div class="content" :style="{
            backgroundColor: type === 'message' ? colors[selectColor] : 'rgba(212,212,212,0.30)'
        }">
            <textarea class="message" placeholder="留言..." maxlength="96" v-model="content"></textarea>
            <input type="text" class="name" placeholder="签名" v-model="name" maxlength="6">
        </div>
        <div class="labels">
            <p class="title">选择标签</p>
            <div class="container">
                <p class="label" v-for="(label, index) in  labels" :key="index"
                    :class="{ 'selected-label': selectLabel === index }" @click="selectLabel = index">{{ label }}
                </p>
            </div>
        </div>
        <div class="statement">
            <p class="title">免责声明</p>
            <p class="statement-content">
                请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
                1、反对宪法所确定的基本原则的；<br />
                2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br />
                3、损害国家荣誉和利益的；<br />
                4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
                5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
                6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
                7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
                8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
                9、含有法律、行政法规禁止的其他内容的信息<br />
            </p>
        </div>
        <div class="buttons">
            <Button size="large" type="text" @click="$emit('close')">丢弃</Button>
            <Button size="large" class="submit" type="dark" @click="submit">确定</Button>
        </div>
    </div>
</template>
<style scoped lang="scss">
.newCard {
    padding: 0 20px 120px;
    position: relative;

    .colors {
        height: 36px;

        .color {
            cursor: pointer;
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 7px;
            border: 1px solid transparent;
        }

        .selected-color {
            border: 1px solid rgba(59, 115, 240, 1);
        }
    }

    .photo {
        padding-bottom: 20px;
        position: relative;

        .file {
            position: absolute;
            z-index: 10;
            top: -10px;
            height: 64px;
            width: 66px;
            opacity: 0;
            cursor: pointer;
        }

        .add-button {
            width: 50px;
            height: 50px;
            border: 1px solid $dark-2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-add {
                width: 24px;
                height: 24px;
            }
        }

        .photo-container {
            max-height: 200px;
            width: 100%;
            background-color: #333;
            overflow-y: scroll;
            display: flex;
            align-items: center;

            &::-webkit-scrollbar {
                display: none;
            }

            img {
                width: 100%;
            }
        }

        .change-button {
            position: absolute;
            top: 12px;
            left: 12px;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;

            .icon-edit {
                width: 20px;
                height: 20px;
            }
        }
    }

    .content {
        height: 240px;
        width: 100%;
        padding: 12px;
        box-sizing: border-box;
        transition: background-color 1s ease;

        .message {
            background: none;
            border: none;
            resize: none;
            height: 172px;
            padding: 8px;
            box-sizing: border-box;
            width: 100%;
            font-size: 15px;
            outline: none;
        }

        .name {
            text-align: right;
            outline: none;
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            background: none;
            border: 1px solid #fff;
            line-height: 20px;
            font-size: 15px;
        }
    }

    .labels {
        .title {
            font-size: 14px;
            color: $dark-1;
            font-weight: 600;
            padding-top: 30px;
        }

        .container {
            display: flex;
            flex-wrap: wrap;
            width: 320px;

            .label {
                padding: 2px 10px;
                border-radius: 20px;
                margin: 16px 4px 0 0;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
                color: $dark-2;
            }

            .selected-label {
                background-color: #dcd7d7;
                font-weight: 600;
            }
        }
    }

    .statement {
        .title {
            font-size: 14px;
            color: $dark-1;
            font-weight: 600;
            padding-top: 30px;
        }

        .statement-content {
            padding-top: 10px;
            font-size: 12px;
            color: $dark-3;
        }
    }

    .buttons {
        padding: 20px;
        box-sizing: border-box;
        position: fixed;
        bottom: 52px;
        left: 0;
        width: 360px;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(20px);

        .submit {
            margin-left: 20px;
            width: 200px;
        }
    }
}
</style>