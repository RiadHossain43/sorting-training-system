<script setup lang="ts">
import Button from '@/components/ui/button.vue';
import Input from "@/components/ui/input.vue";
import Modal from "@/components/ui/modal.vue";
import { ref, } from "vue";
import { useModals } from './composables/useModals';
import { useTableData } from './composables/useTableData';
import { useTimer } from './composables/useTimer';
import Table from "./table.vue";
import Timer from "./timer.vue";

const { isTimerRunning, startTimer, stopTimer } = useTimer();
const { isSetupModalVisible, isScoreModalVisible, openSetupModal, closeSetupModal, showScoreModal, closeScoreModal } = useModals();
const { data, draggedRowIndex, generateData, reorderData, isDataSortedByPotatoes, getSelectedDataCounts } = useTableData({
    onTableDataSorted: stopTimer
});
const configForm = ref({ people: 0 });
const score = ref(0);
const onRowDragStart = (index: number) => {
    draggedRowIndex.value = index;
};
const resetTool = () => {
    stopTimer();
    data.value = [];
    configForm.value.people = 0
};
const showScore = (sc: number) => {
    if (data.value.length && isDataSortedByPotatoes()) {
        score.value = sc;
        showScoreModal();
    }
};
const startSorting = () => {
    startTimer();
    generateData(configForm.value.people);
    closeSetupModal();
};
const stopSorting = () => {
    resetTool()
    closeScoreModal()
}
</script>

<template>
    <div class="container">
        <div class="mt-8 d-flex justify-content-between">
            <h2 class="d-inline-block">Sorting Training System</h2>
            <div>
                <Button :disabled="!isTimerRunning" variant="secondary" class="d-inline-block mb-3 mr-3"
                    @click="resetTool">
                    Reset Tool
                </Button>
                <Button id="start-sort" :disabled="isTimerRunning" variant="primary"
                    class="d-inline-block mb-3" @click="() => openSetupModal()">
                    Start Sorting
                </Button>
            </div>
        </div>
        <form @submit.prevent="startSorting">
            <Modal v-model="isSetupModalVisible">
                <template #header> How Many People? </template>
                <template #content>
                    <label for="people">Enter a number of how many people you want to add to the list</label>
                    <Input type="number" id="people" min="20" max="100" name="people" class="mt-3"
                        v-model="configForm.people" />
                </template>
                <template #footer>
                    <Button type="button" variant="secondary" @click="() => closeSetupModal()">Cancel</Button>
                    <Button type="submit" variant="primary">Generate</Button>
                </template>
            </Modal>
        </form>
        <Modal v-model="isScoreModalVisible" v-on:closed="stopSorting">
            <template #header> Congratulations! </template>
            <template #content>
                <p>All the people are sorted by potatoes in a descending order.</p>
                <p>Your score: {{ score }} seconds</p>
            </template>
            <template #footer>
                <Button id="confirm-score" type="submit" variant="primary" @click="stopSorting">Okay</Button>
            </template>
        </Modal>

        <div class="table-container">
            <div class="d-flex justify-content-between my-5 mx-5">
                <Timer :is-running="isTimerRunning" @timer-stopped="showScore" />
                <h5>{{ getSelectedDataCounts() }} people selected in the list</h5>
            </div>

            <div class="scrollable-x">
                <Table v-bind:data="data" v-on:row-drag-start="onRowDragStart" v-on:row-dropped="(i) => reorderData(i)">
                </Table>
            </div>
        </div>
    </div>
</template>