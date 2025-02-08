<template>
    <svg class="icon" aria-hidden="true" :width="size" :height="size" :style="{ stroke: strokeColor, fill: fillColor }">
        <use :href="iconPath" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IconProps {
    name: string;
    size?: number | string;
    strokeColor?: string;
    fillColor?: string;
}

const props = defineProps<IconProps>();

const iconPath = computed(() => `/src/assets/icons.svg#${props.name}`);
</script>

<style scoped>
.icon {
    fill: none;
}
</style>
