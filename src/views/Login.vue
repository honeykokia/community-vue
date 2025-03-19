<script setup>
import loginLogo from "@/assets/jpg/logo.png";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { computed, ref } from "vue";
import { login } from "@/api/auth";

const authStore = useAuthStore();
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
    (serverErrors.value.password || !loginData.value.password) && touched.value.password,
  general:
    serverErrors.value.general,
}));

const handleBlur = (field) => {
  // serverErrors.value[field] = "";
  touched.value[field] = true;
};

const handleLogin = async () => {

  serverErrors.value = {};
  try{
    const data = await login(loginData.value);
    if(data.status === "error"){
      serverErrors.value = data.errors || {};
      Object.keys(touched.value).forEach((key) => {
        touched.value[key] = true;
      });
      return;
    }
    authStore.login(data.token);
    alert("登入成功");
    router.push("/");

  }catch(error){
    console.log(error);
    serverErrors.value = error.errors || {};
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
      <form @submit.prevent="handleLogin" class="space-y-6" action="#" method="POST">
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
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
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

        <div v-for="error in serverErrors" :key="error" class="p-error">
          {{error}}
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
