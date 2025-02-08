/**
 * @vitest-environment happy-dom
 */
import { DOMWrapper, VueWrapper } from "@vue/test-utils";
import { expect } from "vitest";
import { nextTick } from "vue";
export const sampleData = [
  {
    selected: false,
    email: "read45@emailc.com",
    potatoes: 45,
    tags: ["Customer"],
    fullname: "MD Reyad Hossain",
    location: "Dhaka",
  },
  {
    selected: false,
    email: "read25@emailc.com",
    potatoes: 25,
    tags: ["Customer"],
    fullname: "MD Reyad Hossain",
    location: "Dhaka",
  },
  {
    selected: false,
    email: "read75@emailc.com",
    potatoes: 75,
    tags: ["Customer"],
    fullname: "MD Reyad Hossain",
    location: "Dhaka",
  },
];

export const userActions = {
  clickStartSortButton: async function (wrapper: VueWrapper) {
    const startButton = wrapper.find("#start-sort");
    expect(startButton?.exists()).toBe(true);
    await startButton?.trigger("click");
    nextTick();
  },
  fillPeopleInput: async function (
    wrapper: VueWrapper,
    { numberOfPeople = 3 }
  ) {
    const input = wrapper.find("#people") as DOMWrapper<HTMLInputElement>;
    expect(input?.exists()).toBe(true);
    await input.setValue(numberOfPeople.toString());
    nextTick();
    expect(input.element.value).toBe(numberOfPeople.toString());
    const buttons = wrapper.findAll("button");
    const generateButton = buttons.find((btn) => btn.text() === "Generate");
    expect(generateButton?.exists()).toBe(true);
    await generateButton?.trigger("click");
    nextTick();
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");
    nextTick();
  },
  simulateDragAndDrop: async function (
    wrapper: VueWrapper,
    { sourceRowIndex = 0, targetRowIndex = 1 }
  ) {
    const rows = wrapper.findAll("tbody tr");
    const sourceRow = rows[sourceRowIndex];
    const targetRow = rows[targetRowIndex];
    const dragStartEvent = new DragEvent("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    await sourceRow.trigger("dragstart", dragStartEvent);
    nextTick();
    const dragOverEvent = new DragEvent("dragover", { bubbles: true });
    await targetRow.trigger("dragover", dragOverEvent);
    nextTick();
    const dropEvent = new DragEvent("drop", {
      dataTransfer: dragStartEvent.dataTransfer,
      bubbles: true,
    });
    await targetRow.trigger("drop", dropEvent);
    nextTick();
  },
  simulateSort: async function (wrapper: VueWrapper) {
    await this.clickStartSortButton(wrapper);
    // NOTE: we are testing with ony 2 rows sorting to avoid complexity in test case.
    await this.fillPeopleInput(wrapper, {
      numberOfPeople: 2,
    });
    const potatoCountsTd = wrapper.findAll(".td-potato-counts");
    expect(potatoCountsTd.length).toBe(2);
    const firstPotato = Number(potatoCountsTd[0].element.innerHTML);
    const secondPotato = Number(potatoCountsTd[1].element.innerHTML);

    if (firstPotato < secondPotato) {
      await this.simulateDragAndDrop(wrapper, {
        sourceRowIndex: 0,
        targetRowIndex: 1,
      });
    } else {
      await this.simulateDragAndDrop(wrapper, {
        sourceRowIndex: 0,
        targetRowIndex: 1,
      });
      await this.simulateDragAndDrop(wrapper, {
        sourceRowIndex: 0,
        targetRowIndex: 1,
      });
    }
  },
  clickConfirmScoreButton: async function (wrapper: VueWrapper) {
    const button = wrapper.find("#confirm-score");
    expect(button?.exists()).toBe(true);
    await button?.trigger("click");
    nextTick();
  },
};
