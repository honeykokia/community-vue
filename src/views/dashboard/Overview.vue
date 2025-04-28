<script setup>
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import { getAllAccounts } from "@/api/account";
import { deleteRecordById, getRecordByAccountId } from "@/api/record";

const accountList = ref([]); // 帳戶列表
const recordList = ref([]); // 帳戶交易列表
const incomeTotal = ref(0); // 收入總額
const expenseTotal = ref(0); // 支出總額
const totalPages = ref(0); // 總頁數
const currentPage = ref(1); // 當前頁數
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // 0-based (0 = 一月)

const startDate = ref(new Date(year, month, 2).toISOString().split("T")[0]); // 月初：1號
const endDate = ref(new Date(year, month + 1, 1).toISOString().split("T")[0]); // 月底：下個月第 0 天 = 本月最後一天
const accountData = ref({
  // 帳戶資料
  id: "",
  name: "",
  initial_amount: "",
});

let pieChart = null;
let lineChart = null; // 用來儲存圖表實例
const drawPieChart = () => {
  if (pieChart) {
    pieChart.destroy(); // 清掉舊的 chart
  }
  if (lineChart) {
    lineChart.destroy(); // 清掉舊的 chart
  }

  const pieCtx = document.getElementById("pieChart").getContext("2d");

  const categoryData = recordList.value.reduce((acc, record) => {
    if (record.category.type === -1) {
      const categoryName = record.category.name;
      acc[categoryName] = (acc[categoryName] || 0) + record.itemPrice;
    }
    return acc;
  }, {});

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    income: 0,
    expense: 0,
  }));

  recordList.value.forEach((record) => {
    const recordMonth = new Date(record.itemDate).getMonth();
    if (record.category.type === 1) {
      monthlyData[recordMonth].income += record.itemPrice;
    } else if (record.category.type === -1) {
      monthlyData[recordMonth].expense += record.itemPrice;
    }
  });

  pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: Object.keys(categoryData).map(
            (_, index) =>
              `hsl(${
                (index * 360) / Object.keys(categoryData).length
              }, 70%, 50%)`
          ),
        },
      ],
    },
  });

  const lineCtx = document.getElementById("lineChart").getContext("2d");
  lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      datasets: [
        {
          label: "收入",
          data: monthlyData.map((data) => data.income),
          borderColor: "#4CAF50",
          fill: false,
        },
        {
          label: "支出",
          data: monthlyData.map((data) => data.expense),
          borderColor: "#F44336",
          fill: false,
        },
      ],
    },
  });
};

onMounted(() => {
  //取得目前使用者帳戶
  fetchAccount();
});

watch(
  () => accountData.value.id,
  (newId) => {
    const selected = accountList.value.find((acc) => acc.id === newId);
    if (selected) {
      accountData.value.name = selected.name;
      accountData.value.initial_amount = selected.initial_amount;
      currentPage.value = 1;
      fetchRecordByAccountId(newId);
      drawPieChart();
    }
  }
);
watch(currentPage, (newPage) => {
  if (accountData.value.id) {
    fetchRecordByAccountId(accountData.value.id);
  }
});
watch([startDate, endDate], () => {
  if (accountData.value.id) {
    fetchRecordByAccountId(accountData.value.id);
  }
});
watch(recordList, () => {
  drawPieChart();
});

const fetchAccount = async () => {
  const result = await getAllAccounts();
  if (result.status === "error") {
    alert("取得失敗，請稍後再試");
  } else {
    accountList.value = result.data;
    if (accountList.value.length > 0) {
      Object.assign(accountData.value, accountList.value[0]); // ✅ 正確更新
    }
  }
};

const fetchRecordByAccountId = async (accountId) => {
  const result = await getRecordByAccountId(
    accountId,
    currentPage.value,
    startDate.value,
    endDate.value
  );
  if (result.status === "error") {
    console.log(result.errors);
    alert("取得失敗，請稍後再試");
  } else {
    console.log(result.data);
    recordList.value = result.data.content;
    totalPages.value = result.data.totalPages;
    incomeTotal.value = result.data.incomeTotal || 0;
    expenseTotal.value = result.data.expenseTotal || 0;
    if (currentPage.value > result.data.totalPages) {
      currentPage.value = 1;
    }
  }
};

const fetchDeleteRecord = async (accountId, recordId) => {
  const data = await deleteRecordById(accountId, recordId);
  if (data.status === "error") {
    console.log(data.errors);
    alert("刪除失敗，請稍後再試");
  } else {
    alert("刪除成功");
    fetchRecordByAccountId(accountId);
  }
};
</script>

<template>
  <div class="space-y-10">
    <div class="bg-gray-100 rounded-xl p-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">收入總額</h3>
          <p class="text-2xl font-bold text-green-500">$ {{ incomeTotal }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">支出總額</h3>
          <p class="text-2xl font-bold text-red-500">$ {{ expenseTotal }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">結餘</h3>
          <p class="text-2xl font-bold text-blue-500">
            $ {{ accountData.initial_amount - expenseTotal + incomeTotal }}
          </p>
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
            v-model="startDate"
          />
          <span class="text-gray-500">至</span>
          <input
            type="date"
            class="border rounded p-2 ml-2"
            v-model="endDate"
          />
        </div>
      </div>
    </div>
    <div class="bg-gray-100 rounded-xl p-4">
      <div class="grid grid-cols-1 gap-4 h-full xl:grid-cols-2">
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">支出比例</h3>
          <div class="h-[400px] flex justify-center items-center">
            <canvas id="pieChart"></canvas>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold">月度趨勢圖</h3>
          <div class="h-[400px] w-full flex justify-center items-center"> 
            <canvas id="lineChart"></canvas>
          </div>
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
              <th class="px-4 py-2 border-b">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in recordList" :key="index">
              <td class="px-4 py-2 border-b">{{ record.itemDate }}</td>
              <td
                class="px-4 py-2 border-b"
                :class="
                  record.category.type === 1 ? 'text-green-500' : 'text-red-500'
                "
              >
                {{ record.category.type === 1 ? "收入" : "支出" }}
              </td>
              <td class="px-4 py-2 border-b">${{ record.itemPrice }}</td>
              <td class="px-4 py-2 border-b">{{ record.itemNote }}</td>
              <td class="px-4 py-2 border-b">
                <button
                  class="text-blue-500 hover:underline mr-2"
                  @click="editRecord(record)"
                >
                  編輯
                </button>
                <button
                  class="text-red-500 hover:underline"
                  @click="fetchDeleteRecord(accountData.id, record.id)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center items-center mt-4 space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            class="px-4 py-2 rounded"
            :class="
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            "
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
