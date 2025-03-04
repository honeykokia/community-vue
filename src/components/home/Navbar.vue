<script setup>
import logo from "@/assets/jpg/light.jpg";
import avatar from "@/assets/jpg/avatar.jpg";
import router from "@/router";
import { ref } from "vue";

const logoJpg = ref(logo);
const avatarJpg = ref(avatar)
</script>

<template>
  <div class="navbar">
    <div class="logo">
      <img :src="logoJpg" alt="Vue logo"  class="h-36 w-36"/>
    </div>
    <div class="search mx-4">
      <input
        type="text"
        placeholder="搜尋文章或作者..."
        class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="config flex items-center space-x-4 ml-auto px-10">
      <button class="text-3xl">🌙</button>
      <button class="relative text-2xl">
        🔔
        <span
          class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"
        ></span>
      </button>

      <!-- 使用者頭像 -->
      <img
        :src="avatarJpg"
        alt="User Avatar"
        class="h-16 w-16 rounded-full border-2 border-blue-500 "
      />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 150px;
  background-color: #d4dee4;
  align-items: center;
  height: 100%;
}

.logo {
  padding: 10px;
}

.search {
  font-family: "Noto Sans TC", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}



</style>
