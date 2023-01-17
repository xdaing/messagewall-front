<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useLikeCardHook } from '@/hooks/useLikeCardHook'
import SvgIcon from './SvgIcon.vue'

defineEmits<{ (e: 'selectCard', key: string): void }>()
const props = defineProps<{ card: Card, labels: Array<string> }>()
const { like, loveColor } = useLikeCardHook(props.card.color ? 'message' : 'photo', props.card)
const time = computed<string>(() => dayjs(props.card.time).format('MM/DD HH:mm'))
</script>
<template>
    <div class="messageCard-container" :style="{ backgroundColor: card.color || 'rgba(212,212,212,0.30)' }">
        <div class="top">
            <p>{{ time }}</p>
            <p>{{ labels[card.label]}}</p>
        </div>
        <p class="content" @click="$emit('selectCard', card._id)">{{ card.content }}</p>
        <div class="bottom">
            <div class="icons">
                <SvgIcon name="love" style="cursor: pointer;" :color="loveColor" class="icon" @click="like"></SvgIcon>
                <span>{{ card.liked.length }}</span>
                <SvgIcon name="comment" color="#949494" class="icon"></SvgIcon>
                <span>{{ card.commentNumber }}</span>
            </div>
            <div class="name">{{ card.name }}</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.messageCard-container {
    width: 280px;
    height: 240px;
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;

    .top {
        display: flex;
        justify-content: space-between;

        p {
            font-size: 12px;
            color: $dark-3;
            font-size: 400;
        }
    }

    .content {
        height: 140px;
        font-size: 14px;
        color: $dark-1;
        letter-spacing: 0;
        text-align: justify;
        line-height: 22px;
        word-break: break-all;
        cursor: pointer;
    }

    .bottom {
        display: flex;
        justify-content: space-between;

        .icons {
            display: flex;
            align-items: center;

            span {
                font-size: 14px;
                margin: 0 5px;
                color: $dark-3;
            }

            .icon {
                width: 15px;
                height: 15px;
            }
        }

        .name {
            font-size: 17px;
            color: $dark-1;
            font-weight: 600;
        }
    }
}
</style>