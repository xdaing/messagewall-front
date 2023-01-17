<script setup lang="ts">
interface Props {
    size?: string,
    type?: string
}
withDefaults(defineProps<Props>(), {
    size: 'default',
    type: 'default'
})
</script>
<template>
    <button class="button-base" :class="[`size-${size}`, `type-${type}`]">
        <slot></slot>
    </button>
</template>
<style scoped lang="scss">
.button-base {
    cursor: pointer;
    border: none;
    user-select: none;
}

// 按钮大小
.size-large {
    min-width: 100px;
    line-height: 48px;
    border-radius: 24px;
    padding: 0 24px;
}

.size-default {
    min-width: 80px;
    line-height: 36px;
    border-radius: 24px;
    padding: 0 18px;
}

.size-small {
    min-width: 72px;
    line-height: 32px;
    border-radius: 24px;
    padding: 0 18px;
}

.type-default {
    background: $light-1;
    color: $dark-1;
    font-weight: 600;
}

.type-dark {
    background: $dark-1;
    color: $light-1;
}

.type-text {
    background: none;
    color: $dark-1;
    border: 1px solid $dark-1;
}

.type-primary {
    background: $primary ;
    color: $light-1;
    font-weight: 600;
}
</style>