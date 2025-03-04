<script setup>
import logo from "@/assets/jpg/light.jpg";
import router from "@/router";
import { ref } from "vue";

const logoJpg = ref(logo);
</script>

<template>
  <div class="navbar">
    <div class="logo">
      <img :src="logoJpg" alt="Vue logo" />
    </div>
    <div class="menu">
      <ul>
        <li></li>
        <li>分類</li>
        <li>熱門</li>
        <li>最新</li>
        <li>標籤</li>
        <li>排行榜</li>
      </ul>
    </div>
    <div class="config">
      <ul>
        <li>登入/註冊</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 50px 1fr 1fr;
  grid-template-rows: 150px;
  background-color: #d4dee4;
  align-items: center;
  height: 100%;
}

.logo {
  padding: 10px;
}

.logo img {
  width: 150px;
  height: 150px;
}

.menu {
  font-family: "Noto Sans TC", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}
.menu ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}
.menu ul li {
  padding-left: 50px;
  font-size: 24px;
}

.config {
  padding-right: 30px;
}

.config ul {
  display: flex;
  justify-content: end;
  align-items: center;
  list-style: none;
}
.config ul li {
  padding-left: 50px;
  font-size: 24px;
}


</style>
