<script setup>
import logo from "@/assets/jpg/logo.png";
import { ref } from "vue";
const logoJpg = ref(logo);
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company" />
      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-600">
        會員資料
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900"
            >姓名</label
          >
          <div>
            <input
              type="text"
              name="name"
              id="name"
              class="input-primary"
              disabled
            />
          </div>
        </div>
        <div>
          <label for="birthday" class="text-sm/6 font-medium text-gray-900"
            >生日</label
          >
          <div>
            <input
              type="date"
              name="birthday"
              id="birthday"
              class="input-primary"
              disabled
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >性別</label
          >
          <div>
            <input
              type="text"
              name="gender"
              id="gender"
              class="input-primary"
              disabled
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >信箱</label
          >
          <div>
            <input
              type="text"
              name="email"
              id="email"
              class="input-primary"
              disabled
            />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm">密碼</label>
          <div>
            <input
              type="text"
              name="passowrd"
              id="password"
              class="input-primary"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input-text {
  @apply block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6;
}
</style>
