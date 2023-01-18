<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useClickLove } from '@/hooks/useClickLoveHook'
useClickLove()
</script>
<template>
    <Header></Header>
    <video src="@/assets/video/tree.mp4" class="background-video" autoplay loop muted></video>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component"></component>
        </transition>
    </router-view>
    <Footer></Footer>
</template>
<style scoped lang="scss">
.background-video {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $video-index;
    height: 900px;
}

.fade-enter-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter-from {
    opacity: 0;
}
</style>