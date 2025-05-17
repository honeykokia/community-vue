<script setup>
import { forgetPasswordVerify } from "@/api/auth";
import webLogo from "@/assets/jpg/logo.png";
import router from "@/router";
import { computed, onMounted, ref } from "vue";
import VerifyEmailFail from "./VerifyEmailFail.vue";
import { useRoute } from "vue-router";

const touched = ref(false);
const verifyData = ref({
  verifyToken: "",
  code: "",
});
const resetToken = ref("");
const serverErrors = ref({});

const errors = computed(
  () => ((serverErrors.value.token || serverErrors.value.code) || !verifyData.value.code) && touched.value
);

const route = useRoute();
onMounted(() =>{
    verifyData.value.verifyToken = route.params.verifytoken;
})

const handleBlur = () => {
  touched.value = true;
};

const handleVerifyCode = async () => {
  serverErrors.value = {};
  const result = await forgetPasswordVerify(verifyData.value);
  if (result.status === "error") {
    console.log(result);
    serverErrors.value = result.errors || {};
    return;
  }
  resetToken.value= result.data.resetToken;
  alert("驗證碼正確");
  router.push(`/forgetpassword/reset/${resetToken.value}`)

};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box"></div>
    <h1 class="auth-title">驗證碼</h1>
    <img class="mx-auto h-36 w-auto" :src="webLogo" alt="Your Company" />
    <div class="auth-box-form">
      <form @submit.prevent="handleVerifyCode" action="#" method="post" class="space-y-4">
        <div>
          <label class="auth-label" for="code">驗證碼(六位數)</label>
          <div class="mt-2">
            <input
              v-on:blur="handleBlur"
              v-model="verifyData.code"
              class="input-primary"
              :class="{ 'input-error': errors }"
              type="text"
              id="code"
            />
            <p v-if="errors" class="p-error">
              {{ serverErrors.token || serverErrors.code || "請輸入驗證碼" }}
            </p>
          </div>
        </div>
        <button class="button-primary" type="submit">送出</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
