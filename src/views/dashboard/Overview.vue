<script setup>
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import { getAllAccounts } from "@/api/account";
import { getRecordByAccountId } from "@/api/record";

const accountList = ref([]);   // 帳戶列表
const recordList = ref([]);    // 帳戶交易列表
const incomeTotal = ref(0);    // 收入總額
const expenseTotal = ref(0);   // 支出總額
const accountData = ref({      // 帳戶資料
  id: "",
  name: "",
  initial_amount: "",
});

onMounted(() => {
  //取得目前使用者帳戶
  fetchAccount();

  // Pie Chart
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["收入", "支出"],
      datasets: [
        {
          data: [60, 40], // Example data
          backgroundColor: ["#4CAF50", "#F44336"],
        },
      ],
    },
  });

  // Line Chart
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  new Chart(lineCtx, {
    type: "line",
    data: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月"], // Example months
      datasets: [
        {
          label: "收入",
          data: [500, 700, 800, 600, 900, 1000], // Example data
          borderColor: "#4CAF50",
          fill: false,
        },
        {
          label: "支出",
          data: [300, 400, 500, 300, 600, 700], // Example data
          borderColor: "#F44336",
          fill: false,
        },
      ],
    },
  });
});

watch(
  () => accountData.value.id,
  (newId) => {
    const selected = accountList.value.find((acc) => acc.id === newId);
    console.log(selected)
    if (selected) {
      accountData.value.name = selected.name;
      accountData.value.initial_amount = selected.initial_amount;
      fetchRecordByAccountId(newId);
    }
  }
);

const fetchAccount = async () => {
  const result = await getAllAccounts();
  if (result.status === "error") {
    alert("取得失敗，請稍後再試");
  } else {
    console.log(result.data);
    accountList.value = result.data;
    if (accountList.value.length > 0) {
      Object.assign(accountData.value, accountList.value[0]); // ✅ 正確更新
    }
  }
};

const fetchRecordByAccountId = async (accountId) => {
  const result = await getRecordByAccountId(accountId);
  if (result.status === "error") {
    alert("取得失敗，請稍後再試");
  } else {
    recordList.value = result.data;
    calculateBalance();
  }
};

const calculateBalance = () => {
  incomeTotal.value=0;
  expenseTotal.value=0;
  for (const record of recordList.value) {
    if (record.category.type === 1) {
      incomeTotal.value += record.item_price;
    } else if (record.category.type === -1) {
      expenseTotal.value += record.item_price;
    }
  }
  console.log(incomeTotal.value, expenseTotal.value);
};
</script>

<template>
  <div class="space-y-10">
    <div class="bg-gray-100 rounded-xl p-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">收入總額</h3>
          <p class="text-2xl font-bold text-green-500">
            $ {{ incomeTotal }}
          </p>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">支出總額</h3>
          <p class="text-2xl font-bold text-red-500">$ {{ expenseTotal }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">結餘</h3>
          <p class="text-2xl font-bold text-blue-500">$ {{ accountData.initial_amount }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">帳戶選擇</h3>
          <select
            v-model="accountData.id"
            class="border rounded p-2 my-2 w-full"
          >
            <option
              v-for="account in accountList"
              :key="account.id"
              :value="account.id"
            >
              {{ account.name }}
            </option>
          </select>
          <h3 class="text-lg font-semibold">日期區間</h3>
          <input
            type="date"
            class="border rounded p-2 mr-2"
            :value="
              new Date(new Date().getFullYear(), new Date().getMonth(), 2)
                .toISOString()
                .split('T')[0]
            "
          />
          <span class="text-gray-500">至</span>
          <input
            type="date"
            class="border rounded p-2 ml-2"
            :value="
              new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                .toISOString()
                .split('T')[0]
            "
          />
        </div>
      </div>
    </div>
    <div class="bg-gray-100 rounded-xl p-4">
      <div class="grid grid-cols-2 gap-4 h-full">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">收入與支出比例</h3>
          <div class="h-[500px] flex justify-center items-center">
            <canvas id="pieChart"></canvas>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">月度趨勢圖</h3>
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 rounded-xl p-4">
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">最近交易</h3>
        <table class="table-auto w-full text-left">
          <thead>
            <tr>
              <th class="px-4 py-2 border-b">日期</th>
              <th class="px-4 py-2 border-b">類型</th>
              <th class="px-4 py-2 border-b">金額</th>
              <th class="px-4 py-2 border-b">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border-b">2023-03-01</td>
              <td class="px-4 py-2 border-b text-green-500">收入</td>
              <td class="px-4 py-2 border-b">$500</td>
              <td class="px-4 py-2 border-b">薪水</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b">2023-03-02</td>
              <td class="px-4 py-2 border-b text-red-500">支出</td>
              <td class="px-4 py-2 border-b">$200</td>
              <td class="px-4 py-2 border-b">購物</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b">2023-03-03</td>
              <td class="px-4 py-2 border-b text-red-500">支出</td>
              <td class="px-4 py-2 border-b">$50</td>
              <td class="px-4 py-2 border-b">餐飲</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
