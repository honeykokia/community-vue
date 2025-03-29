<script setup>
import Navbar from "@/components/home/Navbar.vue";
import { ref } from "vue";
import Advertise from "./Advertise.vue";

const showMenu = ref(false);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
    <div>
        <header class="navbar">
            <Navbar />
        </header>
        <main>
            <Advertise />
        </main>
        <footer>
        </footer>
    </div>
</template>

<style scoped>

.navbar{
    @apply flex justify-around items-center h-32 border border-gray-400
}




</style>
