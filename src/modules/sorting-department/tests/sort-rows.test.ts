/**
 * @vitest-environment happy-dom
 */
import SortingSystem from "@/modules/sorting-department/index.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { userActions } from "./herpers";

describe("@/modules/sorting-department", () => {
  it("should show the score modal once the rows are sorted.", async () => {
    const wrapper = mount(SortingSystem);
    await userActions.simulateSort(wrapper);
    const activeModal = wrapper.find(".psd-modal--active");
    // checking if the Congratulations modal is active.
    expect(activeModal.exists()).toBe(true);
    expect(activeModal.text()).toContain("Congratulations!");
  });
});
