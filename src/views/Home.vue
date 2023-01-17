<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
<template>
    <Header></Header>
    <video src="@/assets/video/tree.mp4" class="background-video" autoplay loop muted></video>
    <router-view></router-view>
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
</style>