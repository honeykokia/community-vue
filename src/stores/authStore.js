import { defineStore } from "pinia";
import { ref } from "vue";


export const useAuthStore = defineStore('auth', ()=>{
    
    const token = ref(localStorage.getItem('token') || null);

    const defaultAvatarUrl = `${import.meta.env.VITE_API_URL}/uploads/defaultAvatar.jpg`;
    const image = ref(defaultAvatarUrl);

    const login = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }

    const logout = () => {
        token.value = null;
        image.value = defaultAvatarUrl;
        localStorage.removeItem('token');
    }

    const setImage = (newImage) => {
        image.value = `${import.meta.env.VITE_API_URL}${newImage}`;
    }

    return {token , login , logout , image , setImage};
})