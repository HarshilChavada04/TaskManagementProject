import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userData: null, // Stores user information
        accessToken: null, // Stores access token
    }),
    actions: {
        // Action to set user data and access token
        login(data, token) {
            this.userData = data;
            this.accessToken = token;
        },
        // Action to clear user data and token (for logout)
        logout() {
            this.userData = null;
            this.accessToken = null;
            LocalStorage.remove('auth');
        },
    },
    getters: {
        isAuthenticated(state) {
            // Check if access token exists to confirm authentication
            return !!state.accessToken;
        },
        getToken(state) {
            return state.accessToken;
        },
    },
    persist: true, // Optional: keeps auth data even after a refresh
});
