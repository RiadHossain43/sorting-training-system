<template>
    <button :class="['psd-btn', `psd-btn--${variant}`]" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>

interface ButtonProps {
    variant: "primary" | "secondary";
    disabled?: boolean;
}
defineProps<ButtonProps>();
</script>