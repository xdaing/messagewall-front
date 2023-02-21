<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
defineEmits<{ (e: 'close'): void }>()
defineProps<{ title: string }>()
</script>
<template>
    <div class="drawer-container">
        <div class="drawer">
            <div class="top">
                <div class="title">{{ title }}</div>
                <SvgIcon name="close" class="icon" @click="$emit('close')"></SvgIcon>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
        <div class="mask" @click="$emit('close')"></div>
    </div>
</template>
<style scoped lang="scss">
.drawer-container {
    .drawer {
        width: 360px;
        height: 100%;
        position: fixed;
        top: 52px;
        z-index: $drawer-index;
        right: 0;
        background: rgba(255, 255, 255, 0.80);
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(20px);
        box-sizing: border-box;
        user-select: none;

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px 5px 20px;
            box-sizing: border-box;

            .title {
                font-size: 16px;
                color: $dark-1;
                font-weight: 600;
            }

            .icon {
                width: 20px;
                height: 20px;
                padding: 5px;
                cursor: pointer;
                transition: transform 0.5s ease;

                &:hover {
                    transform: scale(1.2) rotate(180deg);
                }
            }
        }

        .content {
            overflow-y: auto;
            box-sizing: border-box;
            height: 100%;
            padding-bottom: 116px;
            margin: 2px;
        }
    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $drawerMask-index;
        background-color: rgba(255, 255, 255, 0.80);
        backdrop-filter: blur(5px);
        width: 100%;
        height: 100%;
    }
}

.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
    transition: transform 0.3s ease-in-out;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
    transform: translateX(100%);
}

.drawer-enter-active .mask,
.drawer-leave-active .mask {
    transition: opacity 0.5s ease;
}

.drawer-enter-from .mask,
.drawer-leave-to .mask {
    opacity: 0;
}
</style>