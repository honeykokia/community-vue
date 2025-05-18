<script setup>
import { getAllAccounts } from '@/api/account';
import router from '@/router';
import { onMounted, ref } from 'vue'
import { API_URL } from "@/stores/config.js";
import { useToast } from 'vue-toastification';

const toast = useToast();
const accountList = ref([]);

const fetchGetAllAccounts = async () =>{
    const result = await getAllAccounts()
    if(result.status === "error"){
      toast.error("取得失敗，請稍後再試")
    }
    else{
      accountList.value = result.data;
    }
}

const getAccount = (account)=>{
  router.push(`/dashboard/accountDetail/${account.id}`);
}

const addAccount = () =>{
  router.push("/dashboard/accountAdd");
}

onMounted(()=>{
  fetchGetAllAccounts()
})
</script>

<template>
  <div class="mt-4 bg-gray-100 rounded-xl p-4">
    <div class="grid grid-cols-1 place-items-center gap-10 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" >
      <div @click="getAccount(account)" v-for="account in accountList" class="border border-gray-600 rounded-lg w-36 h-36 flex flex-col items-center justify-center cursor-pointer">
        <img :src='`${API_URL}${account.image}`' alt="" class="w-16 h-16 mb-2" />
        <h1 class="text-lg font-bold text-center break-text whitespace-normal line-clamp-1">{{ account.name }}</h1>
        <p class="text-sm text-gray-500">${{account.initial_amount}}</p>
      </div>
      <div @click="addAccount" class="border border-gray-600 rounded-lg w-36 h-36 flex flex-col items-center justify-center cursor-pointer">
        <img :src='`${API_URL}/uploads/defaultAccountAdd.jpg`' alt="" class="w-24 h-24" />
        <h1 class="text-lg font-bold">新增帳戶</h1>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
