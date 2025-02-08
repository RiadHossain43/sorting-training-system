import { ref, type Ref } from "vue";
import { faker } from "@faker-js/faker";
import { generateUniqueNumber } from "@/lib/unique-number-generator";
import { type TableRow } from "@/types";

export interface TableComposableProps {
  onTableDataSorted?: Function;
}
export interface TableComposableUtils {
  data: Ref<TableRow[]>;
  draggedRowIndex: Ref<number | null>;
  generateData: Function;
  reorderData: Function;
  isDataSortedByPotatoes: Function;
  getSelectedDataCounts: Function;
}
export function useTableData({
  onTableDataSorted,
}: TableComposableProps): TableComposableUtils {
  const data = ref<TableRow[]>([]);
  const draggedRowIndex = ref<number | null>(null);

  const _generateRandomData = () => {
    const randomRow: TableRow = {
      selected: false,
      email: faker.internet.email().toLocaleLowerCase(),
      potatoes: generateUniqueNumber(),
      tags: [faker.word.adjective()],
      fullname: faker.person.firstName(),
      location: faker.location.country(),
    };
    data.value.push(randomRow);
  };

  const generateData = (count: number) => {
    data.value = [];
    for (let i = 0; i < count; i++) {
      _generateRandomData();
    }
  };

  const reorderData = (targetIndex: number) => {
    if (draggedRowIndex.value === null || draggedRowIndex.value === targetIndex)
      return;
    const draggedRow = data.value[draggedRowIndex.value];
    data.value.splice(draggedRowIndex.value, 1);
    data.value.splice(targetIndex, 0, draggedRow);
    if (isDataSortedByPotatoes()) {
      if (onTableDataSorted) onTableDataSorted();
    }
    draggedRowIndex.value = null;
  };

  const isDataSortedByPotatoes = () => {
    return data.value.every((item, index) => {
      return index === 0 || data.value[index - 1].potatoes >= item.potatoes;
    });
  };

  const getSelectedDataCounts = () => {
    return data.value.filter((row) => row.selected).length;
  };

  return {
    data,
    draggedRowIndex,
    generateData,
    reorderData,
    isDataSortedByPotatoes,
    getSelectedDataCounts,
  };
}
