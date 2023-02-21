<script setup lang="ts">
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useVisitorStore } from '@/stores/visitor'
import SvgIcon from './SvgIcon.vue'
import Button from './Button.vue'
const route: RouteLocationNormalizedLoaded = useRoute()
const visitorStore = useVisitorStore()
</script>
<template>
    <div class="header">
        <router-link to="/message" replace>
            <div class="logo">
                <SvgIcon name="logo" class="icon-logo"></SvgIcon>
                <p class="title">咩咩</p>
            </div>
        </router-link>
        <div class="switch">
            <router-link to="/message">
                <Button :type="route.path === '/message' ? 'primary' : 'default'" style="margin-right: 24px;"
                    class="button">留言墙</Button>
            </router-link>
            <router-link to="/photo">
                <Button :type="route.path === '/photo' ? 'primary' : 'default'" class="button">照片墙</Button>
            </router-link>
        </div>
        <div class="avatar-container">
            <div class="avatar" :style="{ backgroundImage: visitorStore.avatarColor }"></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.header {
    width: 100%;
    height: 52px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: $header-index;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;

    .logo {
        display: flex;
        align-items: center;
        cursor: pointer;

        .icon-logo {
            width: 30px;
            height: 30px;
        }

        .title {
            font-size: 20px;
            font-weight: 600;
            user-select: none;
            margin-left: 10px;
            color: $dark-1;
        }
    }

    .switch {
        .button {
            transition: all 0.3s ease-in-out;
        }
    }

    .avatar-container {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        overflow: hidden;

        .avatar {
            width: 100%;
            height: 100%;
            cursor: pointer;
            transition: transform 0.5s ease;

            &:hover {
                transform: scale(1.3);
            }
        }
    }
}
</style>