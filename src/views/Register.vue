<script setup>
import loginLogo from "@/assets/jpg/logo.png";
import router from "@/router";
import { computed, ref } from "vue";

const logoJpg = ref(loginLogo);
const api = import.meta.env.VITE_API_URL;
const registerUrl = `${api}/user/register`;

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
  name: (serverErrors.value.name || !registerData.value.name) && touched.value.name,
  birthday: (serverErrors.value.birthday || !registerData.value.birthday) && touched.value.birthday,
  email: (serverErrors.value.email || !registerData.value.email) && touched.value.email,
  gender: (serverErrors.value.gender || !registerData.value.gender) && touched.value.gender,
  password: (serverErrors.value.password || !registerData.value.password) && touched.value.password,
  confirmPassword:
    (serverErrors.value.confirmPassword || !registerData.value.confirmPassword) && touched.value.confirmPassword,
}));

const handleBlur = (field) => {
  serverErrors.value[field]="";
  touched.value[field] = true;
};

const register = async () => {
  const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData.value),
  });

  const data = await response.json();

  if (!response.ok || data.stats === "error") {
    serverErrors.value = data.errors || {};
    Object.keys(touched.value).forEach((key) => {
      touched.value[key] = true;
    });
    return;
  }

  serverErrors.value={};
  alert("註冊成功");
  router.push("/login");

};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company" />
      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-600">
        會員註冊
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        @submit.prevent="register"
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900"
            >姓名</label
          >
          <div class="mt-2">
            <input
              v-model="registerData.name"
              v-on:blur="handleBlur('name')"
              type="text"
              name="name"
              id="name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1-outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :class="{
                'border border-red-500 focus:outline-red-600': errors.name,
              }"
            />
            <p
              v-if="errors.name"
              class="mt-1 h-5 text-base text-red-500 focus:outline-red-600"
            >
              {{serverErrors.name || "請輸入姓名"}}
            </p>
          </div>
        </div>

        <div>
          <label
            for="birthday"
            class="block text-sm/6 font-medium text-gray-900"
            >生日</label
          >
          <div class="mt-2">
            <input
              v-model="registerData.birthday"
              v-on:blur="handleBlur('birthday')"
              type="date"
              name="birthday"
              id="birthday"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1-outline-offset-1 outline-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :class="{
                'border border-red-500 focus:outline-red-600': errors.birthday,
              }"
            />
            <p v-if="errors.birthday" class="mt-1 h-5 text-base text-red-500">
              {{serverErrors.birthday || "請輸入生日"}}
            </p>
          </div>
        </div>

        <div>
          <label for="gender" class="block text-sm/6 font-medium text-gray-900"
            >性別</label
          >
          <div class="mt-2">
            <select
              v-model="registerData.gender"
              v-on:blur="handleBlur('gender')"
              class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :class="{
                'border border-red-500 focus:outline-red-600': errors.gender,
              }"
            >
              <option value="">請選擇</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">其他</option>
            </select>
            <p v-if="errors.gender" class="mt-1 h-5 text-base text-red-500">
              {{serverErrors.gender || "請選擇性別"}}
            </p>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >信箱</label
          >
          <div class="mt-2">
            <input
              v-model="registerData.email"
              v-on:blur="handleBlur('email')"
              type="text"
              name="email"
              id="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1-outline-offset-1 outline-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :class="{
                'border border-red-500 focus:outline-red-600': errors.email,
              }"
            />
            <p v-if="errors.email" class="mt-1 h-5 text-base text-red-500">
              {{serverErrors.email || "請輸入信箱"}}
            </p>
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-900"
            >密碼</label
          >
          <div class="mt-2">
            <input
              v-model="registerData.password"
              v-on:blur="handleBlur('password')"
              type="password"
              name="password"
              id="password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1-outline-offset-1 outline-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :class="{
                'border border-red-500 focus:outline-red-600': errors.password,
              }"
            />
            <p v-if="errors.password" class="mt-1 h-5 text-base text-red-500">
              {{serverErrors.password || "請輸入密碼"}}
            </p>
          </div>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm/6 font-medium text-gray-900"
            >確認密碼</label
          >
          <div class="mt-2">
            <input
              v-model="registerData.confirmPassword"
              v-on:blur="handleBlur('confirmPassword')"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1-outline-offset-1 outline-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :class="{
                'border border-red-500 focus:outline-red-600':
                  errors.confirmPassword,
              }"
            />
            <p
              v-if="errors.confirmPassword"
              class="mt-1 h-5 text-base text-red-500"
            >
              {{serverErrors.confirmPassword || "請輸入確認密碼"}}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  border: 5px solid red;
}
.error-message {
  color: red;
  font-size: 12px;
}
</style>
