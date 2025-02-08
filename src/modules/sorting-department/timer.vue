<template>
    <h5 id="time-display" class="d-inline-block">Time: {{ time }} seconds</h5>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

interface Props {
    startTime?: number;
    isRunning: boolean;
}

const props = defineProps<Props>();
const time = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;
const emit = defineEmits(['timerStopped', 'timerStarted'])

const startTimer = () => {
    emit('timerStarted', time.value)
    if (interval) return;
    interval = setInterval(() => {
        time.value++;
    }, 1000);
};


const stopTimer = () => {
    emit('timerStopped', time.value)
    time.value = 0
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
};

watch(() => props.isRunning, (newVal) => {
    if (newVal) {
        startTimer();
    } else {
        stopTimer();
    }
});

onUnmounted(stopTimer);
</script>
