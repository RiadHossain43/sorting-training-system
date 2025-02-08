<template>
    <input v-bind="inputProps" :class="['psd-input', {
        'psd-input--error': error,
        'psd-input--disabled': disabled,
        'psd-input--readonly': readonly
    }]" v-model="inputValue" />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

export interface InputProps {
    modelValue: string | number;
    type: "text" | "number";
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
}

const props = defineProps<InputProps>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
}>();


const inputValue = ref(props.modelValue);

const inputProps = computed(() => ({
    type: props.type,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readonly: props.readonly,
}));

watch(inputValue, (newValue) => {
    emit("update:modelValue", newValue);
});
watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>
