<script setup lang="ts">
import { type TableRow } from "@/types"
import Badge from "@/components/ui/badge.vue"
import Icon from "@/components/ui/icon.vue"
import Checkbox from "@/components/ui/checkbox.vue";
import { useScrollWindow } from "@/componsables/useScrollWindow";
defineProps<{
    data: TableRow[];
    onRowDragStart: (index: number) => void;
    onRowDropped: (index: number) => void;
}>();
const scrollutils = useScrollWindow({})
</script>

<template>
    <div ref="tableContainer" class="scrollable-x">
        <table class="psd-table">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Potatoes</th>
                    <th>Tags</th>
                    <th>Full Name</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index" draggable="true" @dragstart="onRowDragStart(index)"
                    @dragover.prevent="scrollutils.autoScrollOnDrag" @drop="onRowDropped(index)"
                    @dragend="scrollutils.stopScrolling">
                    <td>
                        <div class="d-flex justify-content-between align-items-center">
                            <span>
                                <span class="cursor-grab mr-2">⠿</span>
                                <Checkbox v-model="row.selected" /> {{ row.email }}
                            </span>
                            <Icon name="chevron-right" size="12" class="cursor-pointer" />
                        </div>
                    </td>
                    <td class="td-potato-counts">{{ row.potatoes }}</td>
                    <td>
                        <Badge class="mr-1" variant="secondary" v-for="(tag, i) in row.tags" :key="i">{{ tag }}</Badge>
                    </td>
                    <td>{{ row.fullname }}</td>
                    <td>{{ row.location }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>