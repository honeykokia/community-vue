<script setup>
import Navbar from '@/components/home/Navbar.vue';


</script>

<template>
  <div class="container">
    <header class="header">
      <Navbar/>
    </header>
    <aside class="sidebar">Sidebar</aside>
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
  background-color: #ddd;
  padding: 20px;
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