/**
 * @vitest-environment happy-dom
 */
import SortingSystem from "@/modules/sorting-department/index.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { userActions } from "./herpers";

describe("@/modules/sorting-department", () => {
  it("should generate appropriate number of rows.", async () => {
    const numberOfPeople = 3;
    const wrapper = mount(SortingSystem);
    await userActions.clickStartSortButton(wrapper);
    await userActions.fillPeopleInput(wrapper, {
      numberOfPeople,
    });
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(numberOfPeople);
  });

  it("should have unique number of rows", async () => {
    const numberOfPeople = 3;
    const wrapper = mount(SortingSystem);
    await userActions.clickStartSortButton(wrapper);
    await userActions.fillPeopleInput(wrapper, {
      numberOfPeople,
    });
    const potatoCountsTd = wrapper.findAll(".td-potato-counts");
    const potatoCounts = potatoCountsTd.map((p) => Number(p.element.innerHTML));
    expect(new Set(potatoCounts).size === potatoCounts.length).toBe(true);
  });
});
