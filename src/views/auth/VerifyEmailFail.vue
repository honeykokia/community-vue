<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { resendVerifyMail } from "@/api/auth";
import router from "@/router";
const route = useRoute();
// const message = computed(() => router.query.message || "");
// const isTokenExpired = computed(
//   () => message.value.includes("過期") || message.value.includes("驗證連結")
// );

// const fetchResendVerifyMail = async()=>{
//     const data = await resendVerifyMail()
//     if(data.status === "error"){
//       alert("寄送失敗，請稍後再試")
//     }
//     else{
//       alert("驗證信已寄送至您的信箱，請注意查收")
//     }
// }
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
