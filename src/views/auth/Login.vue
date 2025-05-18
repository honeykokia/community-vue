<script setup>
import loginLogo from "@/assets/jpg/logo.png";
import router from "@/router";
import {resendVerifyMail} from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { computed, ref } from "vue";
import { login } from "@/api/auth";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const toast = useToast();
const logoJpg = ref(loginLogo);

const serverErrors = ref({});
const touched = ref({
  email: false,
  password: false,
});
const loginData = ref({
  email: "",
  password: "",
});
const errors = computed(() => ({
  email:
    (serverErrors.value.email || !loginData.value.email) && touched.value.email,
  password:
    (serverErrors.value.password || !loginData.value.password) &&
    touched.value.password,
  general: serverErrors.value.general,
}));

const handleBlur = (field) => {
  // serverErrors.value[field] = "";
  touched.value[field] = true;
};

const handleLogin = async () => {
  serverErrors.value = {};
  try {
    const fetchData = await login(loginData.value);

    if (fetchData.status === "error") {
      serverErrors.value = fetchData.errors || {};
      Object.keys(touched.value).forEach((key) => {
        touched.value[key] = true;
      });
      return;
    }

    authStore.login(fetchData.data.token);
    authStore.setImage(fetchData.data.image);
    authStore.setName(fetchData.data.name);
    toast.success("登入成功！")
    router.push("/dashboard");
  } catch (error) {
    serverErrors.value = error.errors || {};
  }
};

const handleresendVerifyMail = async () => {
  try {
    const data = await resendVerifyMail(loginData.value);
    if (data.status === "error") {

      alert(data.errors.email);
    } else {
      toast.success("驗證信已寄送至您的信箱，請注意查收");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company" />
      <h2 class="auth-title">會員登入</h2>
    </div>
    <div class="auth-box-form">
      <form
        @submit.prevent="handleLogin"
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label for="email" class="auth-label">Email address</label>
          <div class="mt-2">
            <input
              v-model="loginData.email"
              v-on:blur="handleBlur('email')"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              class="input-primary"
              :class="{ 'input-error': errors.email }"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="auth-label">Password</label>
            <div class="text-sm">
              <RouterLink
                to="/forgetpassword"
                class="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </RouterLink>
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="loginData.password"
              v-on:blur="handleBlur('password')"
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              class="input-primary"
              :class="{ 'input-error': errors.password }"
            />
          </div>
        </div>

        <div v-for="error in serverErrors" :key="error">
          <p class="p-error">{{error}}</p>
          <button
            v-if="error.includes('尚未驗證')"
            class="text-blue-500 underline"
            @click="handleresendVerifyMail"
          >
            👉 點我重新寄送驗證信
          </button>
        </div>

        <div>
          <button type="submit" class="button-primary">Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6">
        Not a member?
        <RouterLink
          to="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign Up Now
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
