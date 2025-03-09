<script setup>
import Navbar from '@/components/home/Navbar.vue';

const login = () =>{
  console.log("ok");
}

</script>

<template>
  <div class="container">
    <header class="header">
      <Navbar/>
    </header>
    <!-- group relative bg-gray-800 text-white w-16 hover:w-64 transition-[width] duration-300 ease-in-out flex flex-col py-4 space-y-4 -->
    <aside
      class="sidebar group relative w-24 hover:w-48 transition-[width] duration-300 ease-in-out "
    >
      <nav class="flex flex-col h-full py-4 space-y-4">
        <!-- Menu Items -->
        <RouterLink to="/login" class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap">
          <span class="text-3xl icon">👤</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            登入
          </span>
        </RouterLink>

        <a href="#" class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap">
          <span class="text-3xl icon">🔥</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            熱門
          </span>
        </a>
        <a href="#" class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap">
          <span class="text-3xl icon" >📄</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            分類
          </span>
        </a>
        <a href="#" class="flex items-center px-6 py-2 hover:bg-blue-100 whitespace-nowrap">
          <span class="text-3xl icon" >🆕</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100"
          >
            最新
          </span>
        </a>
      </nav>
    </aside>
    <main class="main">
      <RouterView />
    </main>
    <aside class="advertise">Adverstise</aside>
  </div>
</template>

<style scoped>
.container{
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
.sidebar{
  grid-area: sidebar;
  background-color: #c5d1db;
  color: #222222;
}
.main{
  grid-area: main;
  background-color: #f5f5f5;
  padding: 20px;
}
.advertise{
  grid-area: advertise;
  background-color: #f0f2f5;
  padding: 20px;
}
.icon{
  filter: grayscale(40%) brightness(90%);
}
</style>