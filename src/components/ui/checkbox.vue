<template>
    <label class="psd-checkbox">
        <input type="checkbox" v-model="isChecked" class="psd-checkbox__input" :disabled="disabled" />
        <span class="psd-checkbox__label"></span>
    </label>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

interface CheckboxProps {
    modelValue: boolean;
    disabled?: boolean;
}

const props = defineProps<CheckboxProps>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();


const isChecked = ref(props.modelValue);

watch(isChecked, (newVal) => {
    emit("update:modelValue", newVal);
});
</script>
