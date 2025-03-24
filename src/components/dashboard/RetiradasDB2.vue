<script setup>
import { computed, defineProps } from 'vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
    retiradas: {
        type: Object,
        required: true
    }
});

const db2Retiradas = computed(() => {
    return (props.retiradas.db2 || []).filter(item => item.dataformatada);
    
});
console.log('Retiradas DB2:', props.retiradas);
console.log('Dados db2:', props.retiradas.db2);
console.log('Retiradas DB2:', db2Retiradas);
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Últimas Retiradas 2</div>
        <DataTable :value="db2Retiradas" :rows="5" paginator responsiveLayout="scroll" :sortField="'dataformatada'" :sortOrder="-1">
            <Column style="width: 10%" header="Identificação">
                <template #body="slotProps">
                    <span class="msg"> {{ slotProps.data.nome_comprador }}</span>
                </template>
            </Column>
            <Column field="name" header="Produto" :sortable="true" style="width: 10%">
                <template #body="slotProps">
                    <span class="msg">{{ slotProps.data.produtonome }}</span>
                </template>
            </Column>
            <Column field="price" header="Quant." :sortable="true" style="width: 8%; text-align: center">
                <template #body="slotProps">
                    {{ slotProps.data.quantidade }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" header="Data">
                <template #body="slotProps">
                    <span class="img">{{ slotProps.data.dataformatada }}</span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<style scoped>
.msg {
    display: inline-block; /* Alterado para inline-block para garantir que max-width funcione */
    width: 89%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50ch; /* Ajuste para o limite do texto */
}
</style>
