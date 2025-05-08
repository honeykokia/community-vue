<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();


const login = ()=>{
    if(authStore.token){
      router.push("/dashboard")
    }else{
      router.push("/login") 
    }
}

</script>

<template>
  <RouterLink to="/">
    <h1 class="text-4xl text-blue-300 font-bold">MoneyCircle</h1>
  </RouterLink>
  <div>
    <button @click="login" class="button-primary text-2xl">開始記帳</button>
  </div>
</template>

<style scoped></style>
