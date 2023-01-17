<script setup lang="ts">
import { computed } from 'vue'
import { useLikeCardHook } from '@/hooks/useLikeCardHook'
import SvgIcon from './SvgIcon.vue'

const props = defineProps<{ card: Card }>()
const { like, loveColor } = useLikeCardHook('photo', props.card)
const src = computed<string>(() => {
    return `${import.meta.env.VITE_BASE_URL}/images/${props.card.image}`
})
</script>
<template>
    <div class="photo-card">
        <img :src="src" class="photo">
        <div class="mask">
            <div class="like" @click.stop="like">
                <SvgIcon class="icon" name="love" :color="loveColor"></SvgIcon>
                <span class="number">{{ card.liked.length }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.photo-card {
    position: relative;
    cursor: pointer;
    user-select: none;

    .photo {
        width: 100%;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        opacity: 0;
    }

    .like {
        position: absolute;
        left: 8px;
        top: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(10px);
        cursor: pointer;
        opacity: 0;

        .icon {
            width: 15px;
            height: 15px;
            padding-right: 4px;
        }

        .number {
            color: $dark-1;
        }
    }

    &:hover {
        .mask {
            opacity: 1;
        }

        .like {
            opacity: 1;
        }
    }

}
</style>