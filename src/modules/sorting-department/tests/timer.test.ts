/**
 * @vitest-environment happy-dom
 */
import SortingSystem from "@/modules/sorting-department/index.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { userActions } from "./herpers";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
describe("@/modules/sorting-department", () => {
  it("should start the timer once the number of poeple is filled in.", async () => {
    const numberOfPeople = 4;
    const wrapper = mount(SortingSystem);
    await userActions.clickStartSortButton(wrapper);
    await userActions.fillPeopleInput(wrapper, {
      numberOfPeople,
    });
    await delay(1500);
    const secondsElasped = parseInt(
      wrapper.find("#time-display").text().match(/\d+/)?.[0] || "0",
      10
    );
    expect(secondsElasped).toBeGreaterThan(0);
  });
  it("should stop the timer once the number of poeple are sorted.", async () => {
    const wrapper = mount(SortingSystem);
    await userActions.simulateSort(wrapper);
    await userActions.clickConfirmScoreButton(wrapper);
    const secondsElasped = parseInt(
      wrapper.find("#time-display").text().match(/\d+/)?.[0] || "0",
      10
    );
    expect(secondsElasped).toEqual(0);
  });
});
