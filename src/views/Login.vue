<script setup>
import loginLogo from "@/assets/jpg/logo.png";
import router from "@/router";
import { ref } from "vue";

const logoJpg = ref(loginLogo);

const api = import.meta.env.VITE_API_URL;
const loginUrl = `${api}/user/login`;

const loginData = ref({
    email: "",
    password: "",
});

const passwordError = ref("");

const login = async ()=>{
    
    const response = await fetch(loginUrl, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await response.json();
    console.log(data);
    if(!response.ok){
        passwordError.value = data.errors.email;
        return;
    }

    passwordError.value = '';
    alert('登入成功');
    router.push('/');
    
}

</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company">
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-600">會員登入</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="login" class="space-y-6" action="#" method="POST">
            <div>
                <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div class="mt-2">
                <input v-model="loginData.email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                <div class="text-sm">
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                </div>
                <div class="mt-2">
                <input v-model="loginData.password" type="password" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                </div>
            </div>

            <p v-if="passwordError" class="mt-1 h-5 text-base text-red-500">{{ passwordError }}</p>

            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <RouterLink to="/register" class="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up Now
        </RouterLink>
        </p>
    </div>
  </div>
</template>

<style scoped>

</style>