<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { resendVerifyMail } from "@/api/auth";
const router = useRoute();
const message = computed(() => router.query.message || "");
const isTokenExpired = computed(
  () => message.value.includes("過期") || message.value.includes("驗證連結")
);

const fetchResendVerifyMail = async()=>{

    const data = await resendVerifyMail()
    if(data.status === 200){
        router.push("/login")
    }else{
        alert("寄送失敗，請稍後再試")
    }
}

const BackLogin = ()=>{
    router.push("/login")
}

</script>



<template>
  <div class="auth-container">
    <div class="form-container">
      <h1 class="text-2xl">{{ router.query.message }}</h1>
      <button v-if="isTokenExpired" class="button-primary mt-2">🔁 重新寄送驗證信</button>
      <button v-on:click="BackLogin" v-else class="button-primary mt-2">👉 返回登入</button>
    </div>
  </div>
</template>

<style scoped></style>
