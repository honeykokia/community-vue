<script setup>
import { forgetPasswordRequest } from "@/api/auth";
import webLogo from "@/assets/jpg/logo.png";
import router from "@/router";
import { computed, onMounted, ref } from "vue";

const email = ref("");
const touched = ref(false);
const verifyToken = ref("");
const serverErrors = ref({});

const handleBlur = () => {
  touched.value = true;
};
const handleForgetpassword = async() =>{
    serverErrors.value = {};
    const result = await forgetPasswordRequest(email.value);
    if (result.status === "error") {
        serverErrors.value = result.errors || {};
        return;
    }
    verifyToken.value = result.data.verifyToken;
    alert("驗證碼已發送至您的信箱");
    router.push(`/forgetpassword/verify/${verifyToken.value}`);
}


const errors = computed(() => serverErrors.value.email || !email.value && touched.value);
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="webLogo" alt="Your Company" />
      <h1 class="auth-title">忘記密碼</h1>
    </div>
    <div class="auth-box-form">
      <form @submit.prevent="handleForgetpassword" action="#" method="post" class="space-y-4">
        <div>
          <label for="email" class="auth-label">電子信箱</label>
          <div class="mt-2">
            <input
              v-on:blur="handleBlur"
              v-model="email"
              type="text"
              id="email"
              class="input-primary"
              :class="{ 'input-error': errors }"
            />
            <p v-if="errors" class="p-error">
              {{ serverErrors.email || "請輸入信箱" }}
            </p>
          </div>
        </div>

        <button type="submit" class="button-primary">送出</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
