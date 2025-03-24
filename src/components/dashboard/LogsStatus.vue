<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    logs: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Log</div>
        <DataTable :value="logs" :rows="10" :paginator="true" responsiveLayout="scroll" :sortField="'Dia'" :sortOrder="-1">
            <Column header="Cliente" sortable style="width: 10%; text-align: center">
                <template #body="slotProps">
                    {{ slotProps.data.ID_Cliente }}
                </template>
            </Column>
            <Column header="Operacao" :sortable="true" style="width: 15%; text-align: center">
                <template #body="slotProps">
                    {{ slotProps.data.Operacao }}
                </template>
            </Column>
            <Column header="Log" :sortable="true" style="width: 35%">
                <template #body="slotProps">
                    {{ slotProps.data.Log_Web }}
                </template>
            </Column>
            <Column style="width: 30%" header="Data" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.Dia }}
                </template>
            </Column>
            <Column header="Status" bodyClass="text-center" style="min-width: 8rem">
                <template #body="{ data }">
                    <i
                        class="pi"
                        :class="{
                            'pi-check-circle text-green-500': data.Resultado === 'sucesso   ',
                            'pi-times-circle text-red-500': data.Resultado !== 'sucesso   '
                        }"
                    ></i>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
