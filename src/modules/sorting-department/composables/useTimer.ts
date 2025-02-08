import { ref, type Ref } from "vue";
export interface TimerComposableUtils {
  isTimerRunning: Ref<boolean>;
  startTimer: Function;
  stopTimer: Function;
}

export function useTimer(): TimerComposableUtils {
  const isTimerRunning = ref(false);
  const startTimer = () => {
    isTimerRunning.value = true;
  };
  const stopTimer = () => {
    isTimerRunning.value = false;
  };

  return {
    isTimerRunning,
    startTimer,
    stopTimer,
  };
}
