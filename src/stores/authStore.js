import { defineStore } from "pinia";
import { ref } from "vue";


export const useAuthStore = defineStore('auth', ()=>{
    
    const token = ref(localStorage.getItem('token') || null);

    const login = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }

    const logout = () => {
        token.value = null;
        localStorage.removeItem('token');
    }

    return {token , login , logout};
})