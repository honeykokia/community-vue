<script setup>
import Siderbar from "@/components/dashboard/Sliderbar.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

</script>

<template>
  <div class="container-div">
    <!-- <header class="header">
      <Navbar />
    </header> -->
    <!-- group relative bg-gray-800 text-white w-16 hover:w-64 transition-[width] duration-300 ease-in-out flex flex-col py-4 space-y-4 -->
    <aside
      class="sidebar group relative w-24 hover:w-48 transition-[width] duration-300 ease-in-out"
    >
      <Siderbar />
    </aside>
    <main class="main bg-base">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container-div {
  display: grid;
  gap: 10px;
  grid-template-columns: 96px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "sidebar main";
  height: 100vh;
  width: 100%;
}
/* .header {
  grid-area: header;
  background-color: #c5d1db;
  color: black;
} */
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


</style>
