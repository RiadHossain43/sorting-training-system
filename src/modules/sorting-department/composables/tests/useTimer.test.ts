import { useTimer } from "@/modules/sorting-department/composables/useTimer";
import { beforeEach, describe, expect, it } from "vitest";

describe("useTimer", () => {
  let timer: ReturnType<typeof useTimer>;

  beforeEach(() => {
    timer = useTimer();
  });

  it("should initialize with the timer stopped", () => {
    expect(timer.isTimerRunning.value).toBe(false);
  });

  it("should start the timer when startTimer is called", () => {
    timer.startTimer();
    expect(timer.isTimerRunning.value).toBe(true);
  });

  it("should stop the timer when stopTimer is called", () => {
    timer.startTimer();
    timer.stopTimer();
    expect(timer.isTimerRunning.value).toBe(false);
  });
});
