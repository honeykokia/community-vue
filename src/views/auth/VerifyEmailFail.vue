<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { resendVerifyMail } from "@/api/auth";
import router from "@/router";
const route = useRoute();
onMounted(()=>{
    setTimeout(()=>{
        router.push('/login')
    },3000)
})

const backLogin = ()=>{
    router.push("/login")
}

</script>



<template>
  <div class="auth-container">
    <div class="form-container">
      <h1 class="text-2xl">{{ route.query.message }}</h1>
      <button v-on:click="backLogin" class="button-primary mt-2">👉 返回登入</button>
    </div>
  </div>
</template>

<style scoped></style>
