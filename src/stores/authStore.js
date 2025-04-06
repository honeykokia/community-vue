import { defineStore } from "pinia";
import { ref } from "vue";


export const useAuthStore = defineStore('auth', ()=>{
    
    const token = ref(localStorage.getItem('token') || null);

    const defaultAvatarUrl = `${import.meta.env.VITE_API_URL}/uploads/defaultAvatar.jpg`;
    const image = ref(localStorage.getItem('avatarUrl') || defaultAvatarUrl);
    const name = ref();

    const login = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }

    const logout = () => {
        token.value = null;
        image.value = defaultAvatarUrl;
        localStorage.removeItem('token');
        localStorage.removeItem('avatarUrl');
        localStorage.removeItem('name');
    }

    const setImage = (newImage) => {
        image.value = `${import.meta.env.VITE_API_URL}${newImage}`;
        localStorage.setItem('avatarUrl', image.value);
    }

    const setName = (newName) => {
        name.value = newName;
        localStorage.setItem('name', name.value);
    }

    return {token , login , logout , image , setImage , name , setName};
})