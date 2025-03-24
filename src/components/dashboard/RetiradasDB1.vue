<script setup>
import { defineProps, computed } from 'vue';


const props = defineProps({
    retiradas: {
        type: Array,
        required: true
    }
});


</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Últimas Retiradas 1</div>
        <DataTable :value="retiradas" :rows="5" paginator responsiveLayout="scroll" :sortField="'Dia'" :sortOrder="-1">
            <Column style="width: 15%" header="Identificação">
                <template #body="slotProps">
                    {{ slotProps.data.Identificacao }}
                </template>
            </Column>
            <Column field="name" header="Produto" :sortable="true" style="width: 20%">
                <template #body="slotProps">
                    {{ slotProps.data.ProdutoNome }}
                </template>
            </Column>
            <Column field="price" header="Quant." :sortable="true" style="width: 15%; text-align: center">
                <template #body="slotProps">
                    {{ slotProps.data.Quantidade }}
                </template>
            </Column>
            <Column style="width: 25%" sortable header="Data">
                <template #body="slotProps">
                    {{ slotProps.data.Dia }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>
