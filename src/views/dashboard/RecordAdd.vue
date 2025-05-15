<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getAllCategory } from "@/api/category";
import { getAllAccounts } from "@/api/account";
import { addRecord } from "@/api/record";

const activeType = ref(1); // 1: income, -1: expense
const categoryList = ref([]);
const accountList = ref([]);

const serverErrors = ref({});
const selectedAccountId = ref("null");
const recordData = ref({
  categoryId: "null",
  itemPrice: "",
  itemDate: "",
  itemNote: "",
});

const fetchCategory = async () => {
  const result = await getAllCategory();
  if (result.status === "error") {
    alert("取得失敗，請稍後再試");
  } else {
    categoryList.value = result.data;
  }
};

const fetchAccount = async () => {
  const result = await getAllAccounts();
  if (result.status === "error") {
    alert("取得失敗，請稍後再試");
  } else {
    accountList.value = result.data;
  }
};

const fetchAddRecord = async () => {
  if (selectedAccountId.value === "null") {
    alert("請選擇帳戶");
    return;
  }

  const result = await addRecord(selectedAccountId.value, recordData.value);
  if (result.status === "error") {
    console.log(result.errors);
    serverErrors.value = result.errors || {};
  } else {
    recordData.value = {};
    alert("新增成功");
  }
};

const filteredCategoryList = computed(() => {
  return categoryList.value.filter((c) => c.type === activeType.value);
});

onMounted(() => {
  fetchCategory();
  fetchAccount();
});

watch(activeType, (newType) => {
  recordData.value.categoryId = "null"; // Reset categoryId when type changes
  selectedAccountId.value = "null";
});
</script>

<template>
  <div class="mt-4 space-y-10">
    <div
      class="border border-red-30 p-4 bg-gray-100 rounded-xl w-full grid grid-cols-1 md:grid-cols-3"
    >
      <!--左邊表單  -->
      <div>
        <h1 class="text-2xl font-bold mb-6">✏️交易建立</h1>
        <div>
          <button
            @click="activeType = 1"
            :class="[
              'border border-blue-600 rounded-xl w-24 h-10 m-2 duration-300 hover:bg-blue-600',
              activeType === 1 ? 'bg-blue-600 text-white' : 'bg-white',
            ]"
          >
            ➕收入
          </button>
          <button
            @click="activeType = -1"
            :class="[
              'border border-green-600 rounded-xl w-24 h-10 m-2 duration-300 hover:bg-green-600',
              activeType === -1 ? 'bg-green-600 text-white' : 'bg-white',
            ]"
          >
            ➖支出
          </button>
        </div>
        <div class="grid gap-4 p-4">
          <div class="flex items-center">
            <label class="text-lg inline-block w-24 text-right mr-4" for=""
              >收支帳戶</label
            >
            <select
              v-model="selectedAccountId"
              class="rounded-md px-3 py-1.5 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 w-auto"
            >
              <option disabled value="null">請選擇帳戶</option>
              <option
                v-for="account in accountList"
                :key="account.id"
                :value="account.id"
              >
                {{ account.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <label class="text-lg inline-block w-24 text-right mr-4" for=""
              >金額</label
            >
            <input
              v-model="recordData.itemPrice"
              class="rounded-md px-3 py-1.5 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
              type="number"
            />
          </div>
          <div class="flex items-center">
            <label class="text-lg inline-block w-24 text-right mr-4" for=""
              >類別</label
            >
            <select
              v-model="recordData.categoryId"
              class="rounded-md px-3 py-1.5 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 w-48"
            >
              <option disabled value="null">請選擇類別</option>
              <option
                v-for="category in filteredCategoryList"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <label class="text-lg inline-block w-24 text-right mr-4" for=""
              >日期</label
            >
            <input
              v-model="recordData.itemDate"
              class="rounded-md px-3 py-1.5 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 w-48 focus:outline-indigo-600"
              type="date"
            />
          </div>
          <div class="flex items-center">
            <label class="text-lg inline-block w-24 text-right mr-4" for=""
              >備註</label
            >
            <input
              v-model="recordData.itemNote"
              class="rounded-md px-3 py-1.5 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
              type="text"
            />
          </div>
        </div>
      </div>
      <!--右邊圖表
      <div class="p-4 rounded-xl col-span-2 flex flex-col gap-4">
        貼文帳片（可改成選單或上傳）
        <div class="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/48"
            class="w-12 h-12 rounded-full object-cover"
            alt="avatar"
          />
          <span class="text-gray-700 font-medium">你的小帳號名稱</span>
        </div>

        貼文標題
        <input
          type="text"
          placeholder="輸入貼文標題"
          class="text-xl font-semibold px-3 py-2 border rounded-md focus:outline-indigo-500"
        />

        貼文內文
        <textarea
          rows="4"
          placeholder="寫點記帳心得..."
          class="w-full h-full px-3 py-2 border rounded-md resize-none focus:outline-indigo-500"
        ></textarea>
      </div> -->
      <div class="grid justify-center col-span-3 mt-6">
        <button @click="fetchAddRecord" class="button-primary w-24">
          儲存
        </button>
      </div>
    </div>
    <!-- 
    <div class="border border-red-30 bg-gray-100 rounded-xl h-64 min-w-full">
      <h1 class="p-4 text-2xl font-bold">🧾最近交易</h1>
    </div> -->
  </div>
</template>

<style scoped></style>
