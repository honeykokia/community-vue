<script setup>
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

</script>

<template>
  <div>
    <nav class="flex flex-col h-full py-4 space-y-4">
        <!-- Menu Items -->
        <a
          href="#"
          v-if="authStore.token"
          v-on:click="handleLogout"
          class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap"
        >
          <span class="text-3xl icon">👤</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            登出
          </span>
        </a>
        <RouterLink
          v-else
          to="/login"
          class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap"
        >
          <span class="text-3xl icon">👤</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            登入
          </span>
        </RouterLink>

        <a
          href="#"
          class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap"
        >
          <span class="text-3xl icon">🔥</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            熱門
          </span>
        </a>
        <a
          href="#"
          class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap"
        >
          <span class="text-3xl icon">📄</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            分類
          </span>
        </a>
        <a
          href="#"
          class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap"
        >
          <span class="text-3xl icon">🆕</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            最新
          </span>
        </a>
      </nav>
  </div>
</template>

<style scoped>
.icon {
  filter: grayscale(40%) brightness(90%);
}
</style>