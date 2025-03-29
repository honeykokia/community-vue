<script setup>
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div>
    <nav class="sliderbar">
      <RouterLink :to="authStore.token ? '/member': '/login'">
        <img
          :src="authStore.image"
          alt="User Avatar"
          class="sliderbar-img"
        />
      </RouterLink>
      <!-- Menu Items -->

      <!-- <RouterLink v-else to="/login" class="sliderbar-item">
        <span class="sliderbar-item-icon">👤</span>
        <span class="sliderbar-item-span"> 登入 </span>
      </RouterLink> -->

      <a href="#" class="sliderbar-item">
        <span class="sliderbar-item-icon">📰</span>
        <span class="sliderbar-item-span"> 總覽 </span>
      </a>
      <a href="#" class="sliderbar-item">
        <span class="sliderbar-item-icon">📄</span>
        <span class="sliderbar-item-span"> 分類 </span>
      </a>
      <a href="#" class="sliderbar-item">
        <span class="sliderbar-item-icon">🆕</span>
        <span class="sliderbar-item-span"> 最新 </span>
      </a>
      <a
        href="#"
        v-if="authStore.token"
        v-on:click="handleLogout"
        class="sliderbar-item"
      >
        <span class="sliderbar-item-icon">👤</span>
        <span class="sliderbar-item-span"> 登出 </span>
      </a>
    </nav>
  </div>
</template>

<style scoped>
.icon {
  filter: grayscale(40%) brightness(90%);
}
</style>
