<script setup>
import { useAuthStore } from '@/stores/auth';  // Para acessar o estado de autenticação
import { useRouter } from 'vue-router'; 
import { useLayout } from '@/layout/composables/layout';
const { toggleDarkMode, isDarkTheme } = useLayout();

// Instâncias para o store e o router
const store = useAuthStore();
const router = useRouter();

import { ref } from 'vue';

let socket = null;
const monitoring = ref([]);

// Função de logout
const logout = () => {
    // Desconecta o socket, se estiver conectado
    if (socket) {
        socket.on('disconnect', () => {
            console.log('Desconectando Dashboard');
        });
    }

    // Limpa os dados persistentes
    monitoring.value = [];

    // Limpa o estado de isAdmin no store
    store.setAdmin(false);

    // Redireciona para a página de login
    router.push('/');
};
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <router-link to="/" class="layout-topbar-logo">
                <span>LAB220</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!-- Botão de logout -->
                    <button type="button" class="layout-topbar-action" @click="logout">
                        <i class="pi pi-sign-out"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>