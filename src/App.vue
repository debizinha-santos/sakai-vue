<script setup></script>

<template>
    <router-view />
</template>

<style>

/* Estilo para a tabela de Máquinas Ativas */
.tabela-ativa .p-datatable {
    background-color: #e6f4ea; /* Verde claro */
    border: 1px solid #008000; /* Borda verde */
    border-radius: 8px;
}

.tabela-ativa .p-datatable-thead > tr > th {
    background-color: #005500; /* Fundo do cabeçalho */
    color: #c6ffc6; /* Cor do texto do cabeçalho */
}

.tabela-ativa .p-datatable-tbody > tr > td {
    background-color: #98de98; /* Fundo das células */
    color: #003a00; /* Cor do texto */
}

/* Estilo para a tabela de Máquinas em Atenção */
.tabela-atencao .p-datatable {
    background-color: #fff8d6; /* Amarelo claro */
    border: 1px solid #ffd900; /* Borda amarela */
    border-radius: 8px;
}

.tabela-atencao .p-datatable-thead > tr > th {
    background-color: #8c7002; /* Fundo do cabeçalho */
    color: #fff9ba; /* Cor do texto do cabeçalho */
}

.tabela-atencao .p-datatable-tbody > tr > td {
    background-color: #fff693; /* Fundo das células */
    color: #3a2f00; /* Cor do texto */
}

/* Estilo para a tabela de Máquinas Offline */
.tabela-offline .p-datatable {
    background-color: #fbe4e4; /* Vermelho claro */
    border: 1px solid #ff0000; /* Borda vermelha */
    border-radius: 8px;
}

.tabela-offline .p-datatable-thead > tr > th {
    background-color: #780000; /* Fundo do cabeçalho */
    color: #ffd6d6; /* Cor do texto do cabeçalho */
}

.tabela-offline .p-datatable-tbody > tr > td {
    background-color: #feb3b3;  /* Fundo das células */
    color: #3d0000; /* Cor do texto */
}
</style>
