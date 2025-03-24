<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    notificacao: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Notificações</div>
        <DataTable :value="notificacao" :rows="10" :paginator="true" responsiveLayout="scroll">
            <Column field="name" header="Cliente" sortable style="width: 10%; text-align: center">
                <template #body="slotProps">
                    {{ slotProps.data.id_cliente }}
                </template>
            </Column>
            <Column field="price" header="Tipo" :sortable="true" style="width: 15%; text-align: center">
                <template #body="slotProps">
                    {{ slotProps.data.Tipo }}
                </template>
            </Column>
            <Column field="price" header="Mensagem" :sortable="true" style="width: 35%">
                <template #body="slotProps">
                    <span class="msg">{{ slotProps.data.mensagem }}</span>
                </template>
            </Column>
            <Column style="width: 30%" header="Data" :sortable="true">
                <template #body="slotProps">
                   {{ slotProps.data.data_criacao }}
                </template>
            </Column>
            <Column field="status" header="Visto?" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                <template #body="{ data }">
                    <i class="pi" :class="{ 'pi-check-circle text-green-500 ': data.status, 'pi-times-circle text-red-500': !data.status }"></i>
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
