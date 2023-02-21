<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
defineProps<{ position: number }>()
</script>
<template>
    <div class="addButton-container" :style="{ bottom: position + 'px' }">
        <SvgIcon name="add-light" class="icon-addButton"></SvgIcon>
    </div>
</template>
<style scoped lang="scss">
.addButton-container {
    z-index: $addButton-index;
    width: 56px;
    height: 56px;
    background-color: $dark-1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.8s ease;

    &:hover .icon-addButton {
        transform: scale(1.2) rotate(180deg);
    }

    .icon-addButton {
        width: 30px;
        height: 30px;
        transition: all 0.5s ease;
    }
}
</style>