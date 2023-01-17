<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import SvgIcon from '../SvgIcon.vue'
const props = defineProps<{ text: string, type: 'success' | 'warn' | 'error', index: number }>()
const show = ref<boolean>(false)
const position = computed<string>(() => {
    return props.index * 45 + 60 + 'px'
})
onMounted(() => {
    show.value = true
    setTimeout(() => show.value = false, 1500)
})
</script>
<template>
    <transition name="notice">
        <div class="notice" v-if="show" :style="{ top: position }">
            <div class="content">
                <SvgIcon :name="type" class="icon"></SvgIcon>
                <div class="text"> {{ text }}</div>
            </div>
        </div>
    </transition>
</template>
<style scoped lang="scss">
.notice {
    position: fixed;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    z-index: $notice-index;
    line-height: 40px;

    .content {
        display: flex;
        padding: 0 20px;
        border-radius: 4px;
        color: $dark-1;
        background-color: $light-1;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        .icon {
            width: 20px;
            height: 20px;
            margin: 10px 10px 10px 0;
        }

        .text {
            margin-right: 15px;
            user-select: none;
        }
    }
}

.notice-enter-to,
.notice-leave-from {
    transform: translateY(0px);
    opacity: 1;
}

.notice-enter-from,
.notice-leave-to {
    transform: translateY(-55px);
    opacity: 0;
}

.notice-enter-active,
.notice-leave-active {
    transition: all 0.5s;
}
</style>