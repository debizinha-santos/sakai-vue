<script setup>
import { DateTime } from 'luxon';
import { computed, defineProps } from 'vue';

const props = defineProps({
    monitoring: {
        type: Array,
        required: true
    }
});

const clientescomdata = computed(() => {
    return props.monitoring.filter((item) => item.ultimoDataHora); // Filtra os itens sem data
});

//Maquinas Ativas
const maquinasAtivas = computed(() => {
    return monitoramentoRecente.value.length;
});
const pingRecente = (date1) => {
    const agora = DateTime.now();
    console.log('Agora:', agora.toISO());
    const statusTime = DateTime.fromFormat(date1, 'yyyy-MM-dd HH:mm:ss');
    const diffMin = Math.abs(statusTime.diff(agora, 'minutes').minutes);
    return diffMin <= 5; // Retorna true se a diferença for menor ou igual a 5 minutos
};

const monitoramentoRecente = computed(() => {
    return clientescomdata.value.filter((item) => pingRecente(item.ultimoDataHora));
});

//Maquinas em Atenção
const maquinasAtencao = computed(() => {
    return monitoramento1hora.value.length;
});

const ping1hora = (date1) => {
    const agora = DateTime.now();
    const statusTime = DateTime.fromFormat(date1, 'yyyy-MM-dd HH:mm:ss');
    const diffMin = Math.abs(statusTime.diff(agora, 'minutes').minutes);
    return diffMin > 5 && diffMin <= 60; // Retorna true se a diferença for maior ou igual a 5 minutos e menor ou igual a 60 minutos
};

const monitoramento1hora = computed(() => {
    return clientescomdata.value.filter((item) => ping1hora(item.ultimoDataHora));
});

//Maquinas Offline

const maquinasOffline = computed(() => {
    return monitoramentoOffline.value.length;
});

const pingOffline = (date1) => {
    const agora = DateTime.now();
    const statusTime = DateTime.fromFormat(date1, 'yyyy-MM-dd HH:mm:ss');
    const diffMin = Math.abs(statusTime.diff(agora, 'minutes').minutes);
    return diffMin > 60; // Retorna true se a diferença for maior que 60 minutos
};

const monitoramentoOffline = computed(() => {
    return clientescomdata.value.filter((item) => pingOffline(item.ultimoDataHora));
});
</script>
<template>
    <div class="card">
        <div class="datatable-container mt-8">
            <!-- Máquinas Ativas -->
            <div class="data-ativa tabela-ativa">
                <div class="font-semibold text-xl text-black-alpha-80 text-center mb-2">Máquinas Ativas : {{ maquinasAtivas }}</div>
                <DataTable style="width: 100%" :value="monitoramentoRecente" :rows="10" paginator :rowsPerPageOptions="[5, 10, 20, 50]" :sortField="'ultimoDataHora'" :sortOrder="-1">
                    <Column style="width: 10%; text-align: center" header="Base">
                        <template #body="slotProps">
                            {{ slotProps.data.base }}
                        </template>
                    </Column>
                    <Column style="width: 30%" class="msg" header="Cliente" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.nome_cliente }}
                        </template>
                    </Column>
                    <Column header="Identificação" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ slotProps.data.identificacao }}
                        </template>
                    </Column>
                    <Column style="width: 15%" header="Data" :sortable="true">
                        <template class="msg" #body="slotProps">
                            {{ DateTime.fromFormat(slotProps.data.ultimoDataHora, 'yyyy-MM-dd HH:mm:ss').toFormat('HH:mm') }}
                        </template>
                    </Column>
                    <template #empty>
                        <div class="p-4 text-center">
                            <span class="p-text-secondary">Não há dados a serem exibidos</span>
                        </div>
                    </template>
                </DataTable>
            </div>

            <!-- Máquinas em Atenção -->
            <div class="data-atencao tabela-atencao">
                <div class="font-semibold text-xl text-center text-black-alpha-80 mb-2">Máquinas em Atenção : {{ maquinasAtencao }}</div>
                <DataTable style="width: 100%" :value="monitoramento1hora" :rows="10" paginator :rowsPerPageOptions="[5, 10, 20, 50]" responsiveLayout="scroll" :sortField="'ultimoDataHora'" :sortOrder="-1">
                    <Column style="width: 10%; text-align: center" header="Base">
                        <template #body="slotProps">
                            {{ slotProps.data.base }}
                        </template>
                    </Column>
                    <Column header="Cliente" sortable style="width: 10%; text-align: center">
                        <template #body="slotProps">
                            {{ slotProps.data.nome_cliente }}
                        </template>
                    </Column>
                    <Column header="Identificação" :sortable="true" style="width: 35%">
                        <template class="msg" #body="slotProps">
                            {{ slotProps.data.identificacao }}
                        </template>
                    </Column>
                    <Column style="width: 15%" header="Data" :sortable="true">
                        <template class="msg" #body="slotProps">
                            {{ DateTime.fromFormat(slotProps.data.ultimoDataHora, 'yyyy-MM-dd HH:mm:ss').toFormat('HH:mm') }}
                        </template>
                    </Column>
                    <template #empty>
                        <div class="p-4 text-center">
                            <span class="p-text-secondary">Não há dados a serem exibidos</span>
                        </div>
                    </template>
                </DataTable>
            </div>

            <!-- Máquinas Offline -->
            <div class="data-offline tabela-offline">
                <div class="font-semibold text-xl text-center text-black-alpha-80 mb-2">Máquinas Offline : {{ maquinasOffline }}</div>
                <DataTable style="width: 100%" :value="monitoramentoOffline" :rows="10" paginator :rowsPerPageOptions="[5, 10, 20, 50]" responsiveLayout="scroll" :sortField="'ultimoDataHora'" :sortOrder="-1">
                    <Column style="width: 10%; text-align: center" header="Base">
                        <template #body="slotProps">
                            {{ slotProps.data.base }}
                        </template>
                    </Column>
                    <Column header="Cliente" sortable style="width: 10%; text-align: center">
                        <template #body="slotProps">
                            {{ slotProps.data.nome_cliente }}
                        </template>
                    </Column>
                    <Column header="Identificação" :sortable="true" style="width: 35%">
                        <template class="msg" #body="slotProps">
                            {{ slotProps.data.identificacao }}
                        </template>
                    </Column>
                    <Column style="width: 15%" header="Data" :sortable="true">
                        <template class="msg" #body="slotProps">
                            {{ DateTime.fromFormat(slotProps.data.ultimoDataHora, 'yyyy-MM-dd HH:mm:ss').toFormat('HH:mm') }}
                        </template>
                    </Column>
                    <template #empty>
                        <div class="p-4 text-center">
                            <span class="p-text-secondary">Não há dados a serem exibidos</span>
                        </div>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>
<style scoped>
.msg {
    display: inline-block; /* Alterado para inline-block para garantir que max-width funcione */
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50ch; /* Ajuste para o limite do texto */
}

.datatable-container {
    display: flex; /* Define o layout como flexbox */
    gap: 2rem; /* Espaçamento entre os DataTables */
    justify-content: space-around; /* Ajusta o alinhamento horizontal */
}

.datatable-container > div {
    flex: 1; /* Faz com que todos os DataTables ocupem a mesma largura */
    max-width: 35%; /* Define um limite máximo de largura para cada DataTable */
}

.text-container {
    display: flex; /* Define o layout como flexbox */
    justify-content: space-around; /* Ajusta o alinhamento horizontal */
    margin-bottom: 1rem; /* Espaçamento inferior */
}

.top-border {
    border-top: 1px solid #f1f5f9; /* Ajuste a espessura e a cor da borda conforme necessário */
    border-left: 1px solid #f1f5f9; /* Ajuste a espessura e a cor da borda conforme necessário */
    border-right: 1px solid #f1f5f9; /* Ajuste a espessura e a cor da borda conforme necessário */
    border-bottom: 1px solid #f1f5f9; /* Ajuste a espessura e a cor da borda conforme necessário */
}

/* máquinas ativas */
.data-ativa {
    border: 2px solid #008000;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    background-color: #008000;
    color: #f1f5f9;
}

/*  máquinas em atenção */
.data-atencao {
    border: 2px solid #ffff00;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    background-color: #ffd900;
    color: rgb(36, 36, 36);
}

/* offline */
.data-offline {
    border: 2px solid #ff0000;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    background-color: #ff0000;
    color: hsl(0, 100%, 97%);
}
</style>
