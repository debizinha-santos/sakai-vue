<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
// Definindo as variáveis reativas
const email = ref('');
const password = ref('');
const checked = ref(false);
const router = useRouter();
// Usando o store de autenticação
const authStore = useAuthStore();

// Função para autenticar o usuário
const login = async () => {
    try {
        // Enviando o email e senha para a API
        const response = await axios.post('', {
            // URL da API
            login: email.value,
            senha: password.value
        });

        // Verificando se a resposta contém um token
        if (response.data.token) {
            // Salvando o token no store Pinia
            authStore.setToken(response.data.token);

            // Verificando se o e-mail contém "admin"
            if (email.value.includes('admin')) {
                authStore.setAdmin(true);
            }
            router.push({ name: 'dashboard' });
        } else {
            alert('Falha na autenticação: Token não encontrado');
        }
    } catch (error) {
        console.error('Erro na autenticação:', error);
        alert('Erro na autenticação');
    }
};
</script>

<template>
    <div class="flex justify-center mt-8 overflow-hidden">
        <div>
            <div class="bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 login" style="border-radius: 53px">
                <div class="mb-8">
                    <img src="@/assets/images/Icone.ico" alt="Logo da empresa" style="width: 400px; height: auto" />
                </div>

                <div class="">
                    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" placeholder="Insira seu email" class="w-full md:w-[30rem] mb-8" v-model="email" />

                    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                    <Password id="password1" v-model="password" placeholder="Senha" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                        <div class="flex items-center">
                            <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                            <label for="rememberme1">Lembrar senha</label>
                        </div>
                        <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Esqueceu a senha?</span>
                    </div>
                    <Button label="Entrar" class="w-full" @click="login"></Button>
                </div>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</template>

<style scoped>
.login {
    margin-bottom: 35%;
}
</style>
