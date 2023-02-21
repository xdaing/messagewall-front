<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import AddButton from '@/components/AddButton.vue'
import Drawer from '@/components/Drawer.vue'
import Detail from '@/components/Detail.vue'
import NewCard from '@/components/NewCard.vue'
import PhotoCard from '@/components/PhotoCard.vue'
import ImgPreview from '@/components/ImgPreview.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useCardHook } from '@/hooks/useCardHook'

const title: string = '照片墙'
const slogan: string = '光与影，定格当下。'
const labels: Array<string> = ['我', 'ta', '喜欢的', '有意义的', '值得纪念的', '母校', '生活', '天空', '城市', '大海', '无题']

const {
    currentLabel,
    changeLabel,
    isAll,
    isLoading,
    cards,
    addCard,
    showerDrawer,
    closeDrawer,
    selectCardIndex,
    changeSelectCard,
    buttonPosition,
    animation
} = useCardHook('photo')

</script>
<template>
    <div>
        <Tabs :title="title" :slogan="slogan" :labels="labels" :currentLabel="currentLabel" @changeLabel="changeLabel">
        </Tabs>
        <div class="photos-container">
            <div class="empty" v-if="cards.length === 0 && isLoading === false">
                <SvgIcon name="photo" class="icon"></SvgIcon>
                <p>还没有照片,快贴上第一张吧</p>
            </div>
            <div class="photos">
                <PhotoCard :card="card" v-for="(card, index) in cards" class="photo" @click="changeSelectCard(index)">
                </PhotoCard>
            </div>
            <div ref="animation" v-show="isLoading" class="loading"></div>
        </div>
        <div v-if="isAll && cards.length !== 0" class="isAll">没有更多了...</div>
        <transition name="image" :duration="500">
            <ImgPreview v-if="selectCardIndex !== -1" :url="cards[selectCardIndex].image!">
            </ImgPreview>
        </transition>
        <AddButton @click="showerDrawer = true" :position="buttonPosition"></AddButton>
        <!-- 抽屉关闭的动画 -->
        <transition name="drawer" :duration="500">
            <Drawer v-if="showerDrawer" @close="closeDrawer" :title="selectCardIndex === -1 ? '留言' : '详情'">
                <Detail :labels="labels" :card="cards[selectCardIndex]" v-if="selectCardIndex !== -1" type="photo">
                </Detail>
                <NewCard v-else :labels="labels" type="photo" @close="closeDrawer" @refresh="addCard"></NewCard>
            </Drawer>
        </transition>
    </div>
</template>
<style scoped lang="scss">
.photos-container {
    min-height: 400px;

    .empty {
        margin: 100px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            width: 100px;
            height: 100px;
        }

        p {
            user-select: none;
            font-size: 25px;
            font-weight: 600;
            margin-top: 20px;
            color: $dark-3;
        }
    }

    .photos {
        padding-top: 20px;
        width: 88%;
        margin: 0 auto;
        columns: 5;
        column-gap: 3px;

        .photo {
            break-inside: avoid;
        }
    }
}

.isAll {
    font-size: 14px;
    width: 100px;
    margin: 0 auto;
    color: $dark-2;
}

.loading {
    height: 200px;
    margin: 0 auto -60px;
}
</style>