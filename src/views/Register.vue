<script setup>
import logo from "@/assets/jpg/logo.png";
import router from "@/router";
import { computed, ref } from "vue";
import { register } from "@/api/auth";

const api = import.meta.env.VITE_API_URL;

const logoJpg = ref(logo);
const serverErrors = ref({});
const touched = ref({
  name: false,
  birthday: false,
  email: false,
  gender: false,
  password: false,
  confirmPassword: false,
});

const registerData = ref({
  name: "",
  birthday: "",
  email: "",
  gender: "",
  password: "",
  confirmPassword: "",
});

const errors = computed(() => ({
  name:
    (serverErrors.value.name || !registerData.value.name) && touched.value.name,
  birthday:
    (serverErrors.value.birthday || !registerData.value.birthday) &&
    touched.value.birthday,
  email:
    (serverErrors.value.email || !registerData.value.email) &&
    touched.value.email,
  gender:
    (serverErrors.value.gender || !registerData.value.gender) &&
    touched.value.gender,
  password:
    (serverErrors.value.password || !registerData.value.password) &&
    touched.value.password,
  confirmPassword:
    (serverErrors.value.confirmPassword ||
      !registerData.value.confirmPassword) &&
    touched.value.confirmPassword,
}));

const handleBlur = (field) => {
  serverErrors.value[field] = "";
  touched.value[field] = true;
};

const handleRegister = async () => {
  
  serverErrors.value = {};
  const data = await register(registerData.value);
  console.log(data);
  if (data.status === "error") {
    serverErrors.value = data.errors || {};
    Object.keys(touched.value).forEach((key) => {
      touched.value[key] = true;
    });
    return;
  }

  alert("註冊成功");
  router.push("/login");
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company" />
      <h2 class="auth-title">會員註冊</h2>
    </div>
    <div class="auth-box-form">
      <form
        @submit.prevent="handleRegister"
        class="space-y-6"
        action="#"
        method="POST"
      >
      
      <div>
          <label for="email" class="auth-label">信箱</label>
          <div class="mt-2">
            <input
              v-model="registerData.email"
              v-on:blur="handleBlur('email')"
              type="text"
              name="email"
              id="email"
              class="input-primary"
              :class="{
                'input-error': errors.email,
              }"
            />
            <p v-if="errors.email" class="p-error">
              {{ serverErrors.email || "請輸入信箱" }}
            </p>
          </div>
        </div>

        <div>
          <label for="name" class="auth-label">姓名</label>
          <div class="mt-2">
            <input
              v-model="registerData.name"
              v-on:blur="handleBlur('name')"
              type="text"
              name="name"
              id="name"
              class="input-primary"
              :class="{
                'input-error': errors.name,
              }"
            />
            <p v-if="errors.name" class="p-error">
              {{ serverErrors.name || "請輸入姓名" }}
            </p>
          </div>
        </div>

        <div>
          <label for="birthday" class="auth-label">生日</label>
          <div class="mt-2">
            <input
              v-model="registerData.birthday"
              v-on:blur="handleBlur('birthday')"
              type="date"
              name="birthday"
              id="birthday"
              class="input-primary"
              :class="{
                'input-error': errors.birthday,
              }"
            />
            <p v-if="errors.birthday" class="p-error">
              {{ serverErrors.birthday || "請輸入生日" }}
            </p>
          </div>
        </div>

        <div>
          <label for="gender" class="auth-label">性別</label>
          <div class="mt-2">
            <select
              v-model="registerData.gender"
              v-on:blur="handleBlur('gender')"
              class="input-primary"
              :class="{
                'input-error': errors.gender,
              }"
            >
              <option value="">請選擇</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">其他</option>
            </select>
            <p v-if="errors.gender" class="p-error">
              {{ serverErrors.gender || "請選擇性別" }}
            </p>
          </div>
        </div>

        <div>
          <label for="password" class="auth-label">密碼</label>
          <div class="mt-2">
            <input
              v-model="registerData.password"
              v-on:blur="handleBlur('password')"
              type="password"
              name="password"
              id="password"
              class="input-primary"
              :class="{
                'input-error': errors.password,
              }"
            />
            <p v-if="errors.password" class="p-error">
              {{ serverErrors.password || "請輸入密碼" }}
            </p>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="auth-label">確認密碼</label>
          <div class="mt-2">
            <input
              v-model="registerData.confirmPassword"
              v-on:blur="handleBlur('confirmPassword')"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="input-primary"
              :class="{
                'input-error': errors.confirmPassword,
              }"
            />
            <p v-if="errors.confirmPassword" class="p-error">
              {{ serverErrors.confirmPassword || "請輸入確認密碼" }}
            </p>
          </div>
        </div>

        <div class="pb-8">
          <button type="submit" class="button-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
