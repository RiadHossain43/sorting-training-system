<template>
    <span :class="['psd-badge', `psd-badge--${variant}`]">
        <slot></slot>
    </span>
</template>

<script lang="ts" setup>
interface BadgeProps {
    variant: "primary" | "secondary" | "error";
}
withDefaults(defineProps<BadgeProps>(), {
    variant: "primary"
})
</script>