<script setup>
import { defineProps, computed } from 'vue';
import { DateTime } from 'luxon';

const props = defineProps({
    monitoring: {
        type: Object,
        required: true
    }
});

const db2monitoring = computed(() => {
    return (props.monitoring.db2 || []). filter(item => item.ultimoDataHora);
});
console.log('Monitoramento:', props.monitoring);
console.log('Dados db2:', props.monitoring.db2);
console.log('Monitoramento DB2:', db2monitoring);

const statusTime = (date1) => {
    const agora = DateTime.now();
    console.log('Agora:', agora.toISO());

    // Converte a data recebida no formato para o objeto DateTime
    const statusTime = DateTime.fromFormat(date1, 'yyyy-MM-dd HH:mm:ss'); 
    console.log('StatusTime:', statusTime.toISO()); 

    // Calcula a diferença em minutos, arredondando para o inteiro mais próximo
    const diffMin = Math.abs(statusTime.diff(agora, 'minutes').minutes);
    console.log('Diferença em minutos:', diffMin);

    // Verifica se a diferença de tempo é menor ou igual a 5 minutos
    if (diffMin <= 5) {
        return 'pi-check-circle text-green-500'; // Ícone verde
    } else {
        return 'pi-times-circle text-red-500'; // Ícone vermelho
    }
};
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Monitoramento DB2</div>
        <DataTable :value="db2monitoring" :rows="10" :paginator="true" responsiveLayout="scroll" :sortField="'ultimoDataHora'" :sortOrder="-1">
            <Column style="width: 15%" header="Máquina">
                <template #body="slotProps">
                    {{ slotProps.data.ID_DM }}
                </template>
            </Column>
            <Column header="Cliente" sortable style="width: 15%">
                <template #body="slotProps">
                    {{ slotProps.data.ID_Cliente }}
                </template>
            </Column>
            <Column header="Identificação" :sortable="true" style="width: 35%">
                <template class="msg" #body="slotProps">
                    {{ slotProps.data.identificacao }}
                </template>
            </Column>
            <Column style="width: 30%" header="Data" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.ultimoDataHora }}
                </template>
            </Column>
            <Column header="Status" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                <template #body="{ data }">
                    <i class="pi" :class="statusTime(data.ultimoDataHora)">
                        {{ data.status }}
                    </i>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<style scoped>
.msg {
    display: inline-block; /* Alterado para inline-block para garantir que max-width funcione */
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50ch; /* Ajuste para o limite do texto */
}
</style>