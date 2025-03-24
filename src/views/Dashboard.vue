<script setup>
import Monitoring from '@/components/dashboard/Monitoring.vue'; // Importa o componente Monitoring
import TotalRetiradas from '@/components/dashboard/TotalRetiradas.vue'; // Importa o componente TotalRetiradas
import { useAuthStore } from '@/stores/auth'; // Importa o store de autenticação
import { io } from 'socket.io-client'; // Importa o cliente do socket.io
import { onMounted, ref } from 'vue'; // Importa os hooks do Vue

const store = useAuthStore(); // Instância do store de autenticação

const monitoring = ref([]); // Referência para o array de monitoramento
const ranking = ref([]); // Referência para o array de ranking
const total = ref([]); // Referência para o array de ranking

onMounted(() => {
    const socket = io('', {
        extraHeaders: {
            Authorization: 'Bearer ' + store.userToken
        }
    }); // Conecta ao servidor do socket.io

    socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        socket.emit('statusPooling');
        socket.emit('rankingPool');
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
    });

    socket.on('poolingData', (data) => {
        console.log('statusPooling data:', data);
        monitoring.value = data;
    });

    socket.on('poolingRanking', (data) => {
        ranking.value = data;
    });

    socket.on('rankingData', (data) => {
        total.value = data;
    });
});
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div v-if="total.length > 0" class="col-span-12 xl:col-span-12">
            <TotalRetiradas :total="total" />
        </div>
        <div v-if="monitoring.length > 0" class="col-span-12 xl:col-span-12">
            <Monitoring :monitoring="monitoring" />
        </div>
    </div>
</template>
