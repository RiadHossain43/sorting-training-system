/**
 * @vitest-environment happy-dom
 */
import { mount } from "@vue/test-utils";
import SortingSystem from "@/modules/sorting-department/index.vue";
import { describe, it, expect } from "vitest";

describe("@/modules/sorting-department", () => {
  it("renders properly", () => {
    const wrapper = mount(SortingSystem);
    expect(wrapper.text()).toContain("Sorting Training System");
    expect(wrapper.findComponent({ name: "Timer" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "Table" }).exists()).toBe(true);
  });
});
