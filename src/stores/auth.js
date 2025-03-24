import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        Admin: false
    }),
    actions: {
        setToken(token) {
            this.token = token;
        },
        clearToken() {
            this.token = null;
        },
        setAdmin(value) {
            this.Admin = value;
        }
    },
    getters: {
        userToken: (state) => {
            return state.token;
        },
        isAdmin: (state) => {
            return state.Admin;
        }
    },
    persist: true
});
