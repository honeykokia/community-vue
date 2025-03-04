<script setup>
import Navbar from '@/components/home/Navbar.vue';


</script>

<template>
  <div class="container">
    <header class="header">
      <Navbar/>
    </header>
    <aside
      class="sidebar group relative text-white transition-all duration-300 w-20 hover:w-64"
    >
      <nav class="flex flex-col h-full py-4 space-y-4">
        <!-- Menu Items -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-blue-100">
          <span class="text-3xl">👤</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            登入
          </span>
        </a>
        <a href="#" class="flex items-center px-4 py-2 hover:bg-blue-100">
          <span class="text-3xl">🔥</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            熱門
          </span>
        </a>
        <a href="#" class="flex items-center px-4 py-2 hover:bg-blue-100">
          <span class="text-3xl">📄</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            分類
          </span>
        </a>
        <a href="#" class="flex items-center px-4 py-2 hover:bg-blue-100">
          <span class="text-3xl">🆕</span>
          <span
            class="text-xl ml-2 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            最新
          </span>
        </a>
      </nav>
    </aside>
    <main class="main">
      <h1>
    Hello Vue + Tailwind!
    </h1>
      <RouterView />
    </main>
    <aside class="advertise">Adverstise</aside>
  </div>
</template>

<style scoped>
.container{
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr 150px;
  grid-template-rows: 150px 1fr;
  grid-template-areas: 
    "header header header"
    "sidebar main advertise";
  height: 100vh;

}
.header {
  grid-area: header;
  color: black;
}
.sidebar{
  grid-area: sidebar;
  background-color: #d4dee4;
  color: #222222;
}
.main{
  grid-area: main;
  background-color: #f5f5f5;
  padding: 20px;
}
.advertise{
  grid-area: advertise;
  background-color: #eee;
  padding: 20px;
}
</style>