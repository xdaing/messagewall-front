<script setup lang="ts">
defineProps<{
    title: string,
    slogan: string,
    labels: Array<string>,
    currentLabel: number
}>()
defineEmits<{ (e: 'changeLabel', labelIndex: number): void }>()
</script>
<template>
    <div class="tabs">
        <p class="title">{{ title }}</p>
        <p class="slogan">{{ slogan }}</p>
        <ul class="labels">
            <li class="label" @click="$emit('changeLabel', -1)" :class="{ 'label-selected': currentLabel === -1 }">全部
            </li>
            <li class="label" v-for="(label, index) in labels" @click="$emit('changeLabel', index)" :key="index"
                :class="{ 'label-selected': currentLabel === index }">{{ label }}
            </li>
        </ul>
    </div>
</template>
<style scoped lang="scss">
.tabs {
    margin-top: 52px;
    user-select: none;
    margin-bottom: 40px;

    .title {
        padding-top: 50px;
        padding-bottom: 15px;
        font-size: 56px;
        font-weight: 600;
        text-align: center;
    }

    .slogan {
        color: $dark-2;
        text-align: center;
    }

    .labels {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    .label {
        border: 1px solid transparent;
        color: $dark-2;
        line-height: 25px;
        font-size: 14px;
        padding: 0 10px;
        cursor: pointer;
        margin: 5px 7px;
        border-radius: 16px;
        transition: border 0.5s ease;

        &:hover {
            border: 1px solid rgb(189, 189, 189);
        }

        &-selected {
            border: 1px solid $dark-1 !important;
            font-weight: 600;
            border-radius: 16px;
            color: $dark-2;
        }
    }
}
</style>