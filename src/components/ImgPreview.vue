<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ url: string }>()
const src = computed<string>(() => `${import.meta.env.VITE_BASE_URL}/images/${props.url}`)
</script>
<template>
    <div class="preview">
        <div class="container">
            <img :src="src" class="photo">
        </div>
    </div>
</template>
<style scoped lang="scss">
.preview {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: $preview-index;

    .container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-right: 360px;
        overflow-y: auto;
        display: flex;
        justify-content: center;
    }

    .photo {
        padding: 80px 40px 30px 40px;
        max-width: 80%;
        Object-fit: contain
    }

}

.image-enter-active .photo,
.image-leave-active .photo {
    transition: opacity 0.5s ease;
}

.image-enter-from .photo,
.image-leave-to .photo {
    opacity: 0;
}
</style>