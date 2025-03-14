<script setup>
import Navbar from "@/components/home/Navbar.vue";
import Siderbar from "@/components/home/Siderbar.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

</script>

<template>
  <div class="container">
    <header class="header">
      <Navbar />
    </header>
    <!-- group relative bg-gray-800 text-white w-16 hover:w-64 transition-[width] duration-300 ease-in-out flex flex-col py-4 space-y-4 -->
    <aside
      class="sidebar group relative w-24 hover:w-48 transition-[width] duration-300 ease-in-out"
    >
      <Siderbar />
    </aside>
    <main class="main">
      <RouterView />
    </main>
    <aside class="advertise">Adverstise</aside>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: 96px 1fr 150px;
  grid-template-rows: 150px 1fr;
  grid-template-areas:
    "header header header"
    "sidebar main advertise";
  height: 100vh;
}
.header {
  grid-area: header;
  background-color: #c5d1db;
  color: black;
}
.sidebar {
  grid-area: sidebar;
  background-color: #c5d1db;
  color: #222222;
}
.main {
  grid-area: main;
  background-color: #f5f5f5;
  padding: 20px;
}
.advertise {
  grid-area: advertise;
  background-color: #f0f2f5;
  padding: 20px;
}

</style>
