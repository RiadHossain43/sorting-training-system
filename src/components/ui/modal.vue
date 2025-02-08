<template>
    <div :class="['psd-modal', { 'psd-modal--active': isVisible }]">
        <div class="psd-modal__content">
            <div class="psd-modal__header">
                <slot name="header">Modal Header</slot>
                <span class="pull-right">
                    <Icon name="cross" :size="16" class="cursor-pointer" @click="closeModal" />
                </span>
            </div>
            <div class="psd-modal__body">
                <slot name="content">Modal Body Content</slot>
            </div>
            <div class="psd-modal__footer">
                <slot name="footer">
                    <Button variant="secondary" @click="closeModal">Close</Button>
                    <Button variant="primary" @click="confirmModal">Confirm</Button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Icon from "@/components/ui/icon.vue";
import Button from "./button.vue";
export interface ModalProps {
    modelValue: boolean;
    onClosed?: Function
}

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();


const props = defineProps<ModalProps>();

const isVisible = ref(props.modelValue);


watch(() => props.modelValue, (newVal) => {
    isVisible.value = newVal;
});


const closeModal = () => {
    emit("update:modelValue", false);
    if (props.onClosed) props.onClosed()
};

const confirmModal = () => {
    closeModal();
    if (props.onClosed) props.onClosed()
};
</script>