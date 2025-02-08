import { useTableData } from "@/modules/sorting-department/composables/useTableData";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/unique-number-generator", () => ({
  generateUniqueNumber: vi.fn().mockReturnValue(42),
}));

describe("useTableData", () => {
  let hook: ReturnType<typeof useTableData>;

  beforeEach(() => {
    vi.clearAllMocks();
    hook = useTableData({});
  });

  it("should generate random data", () => {
    hook.generateData(3);
    expect(hook.data.value).toHaveLength(3);
    expect(hook.data.value[0].potatoes).toBe(42);
    expect(hook.data.value[0].email).toBeTruthy();
    expect(hook.data.value[0].fullname).toBeTruthy();
  });

  it("should reorder data", () => {
    hook.generateData(3);
    hook.data.value[0].potatoes = 100;
    hook.data.value[1].potatoes = 50;
    hook.data.value[2].potatoes = 75;
    hook.draggedRowIndex.value = 0;
    hook.reorderData(2);
    expect(hook.data.value[2].potatoes).toBe(100);
  });

  it("should correctly identify if data is sorted by potatoes", () => {
    hook.generateData(3);
    hook.data.value[0].potatoes = 100;
    hook.data.value[1].potatoes = 50;
    hook.data.value[2].potatoes = 75;
    expect(hook.isDataSortedByPotatoes()).toBeFalsy();
    hook.draggedRowIndex.value = 2;
    hook.reorderData(1);
    expect(hook.isDataSortedByPotatoes()).toBeTruthy();
  });

  it("should count selected rows", () => {
    hook.generateData(3);
    hook.data.value[0].selected = true;
    expect(hook.getSelectedDataCounts()).toBe(1);
    hook.data.value[1].selected = true;
    expect(hook.getSelectedDataCounts()).toBe(2);
  });

  it("should trigger onTableDataSorted callback after reordering", () => {
    const onTableDataSorted = vi.fn();
    hook = useTableData({ onTableDataSorted });
    hook.generateData(3);
    hook.data.value[0].potatoes = 100;
    hook.data.value[1].potatoes = 50;
    hook.data.value[2].potatoes = 75;
    hook.draggedRowIndex.value = 1
    hook.reorderData(2);
    expect(onTableDataSorted).toHaveBeenCalledTimes(1);
  });
});
