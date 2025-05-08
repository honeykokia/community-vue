<script setup>
import router from '@/router';
import { onMounted } from 'vue';


onMounted(()=>{
    setTimeout(()=>{
        router.push('/login')
    },3000)
})

</script>

<template>
  <div class="auth-container">
    <div class="form-container">
      <h1 class="text-2xl">驗證成功🚀🚀🚀</h1>
      <p class="mt-2">3 秒後自動跳轉至登入頁面</p>
      <RouterLink to="/login" class="btn mt-2">👉 立即前往登入</RouterLink>

    </div>
  </div>
</template>

<style scoped>

</style>