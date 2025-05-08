<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { getAllCategory } from "@/api/category";


const activeType = ref(1); // 1: income, -1: expense
const categoryList = ref([]);

const props = defineProps({
  show: Boolean,
  record: Object,
});

const emit = defineEmits(["close", "save"]);
const editedRecord = reactive({
  id: null,
  categoryId: null,
  itemPrice: "",
  itemNote: "",
  itemDate: null,
});

const fetchCategory = async () => {
  const result = await getAllCategory();
  if (result.status === "error") {
    alert("取得失敗，請稍後再試");
  } else {
    categoryList.value = result.data;
  }
};

const filteredCategoryList = computed(() => {
  return categoryList.value.filter((c) => c.type === activeType.value);
});

watch(
  () => props.record,
  (newRecord) => {
    if (newRecord) {
      editedRecord.id = newRecord.id;
      editedRecord.itemPrice = newRecord.itemPrice;
      editedRecord.itemNote = newRecord.itemNote;
      editedRecord.itemDate = newRecord.itemDate;
      editedRecord.categoryId = newRecord.category.id;
      activeType.value = newRecord.category.type;
      console.log(JSON.stringify(editedRecord));
    }
  },
  { immediate: true }
);

watch(activeType, (newType) => {
  editedRecord.categoryId = null; // Reset categoryId when type changes
});

onMounted(() => {
  fetchCategory();
});


const emitSave = () => {
  emit("save", { ...editedRecord });
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-xl font-bold mb-4">編輯紀錄</h2>

      <!-- 🔁 收入 / 支出切換 -->
      <div>
        <button
          @click="activeType = 1"
          :class="[
            'border border-blue-600 rounded-xl w-24 h-10 mr-2 duration-300 hover:bg-blue-600',
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

      <!-- 🔽 選擇分類（依收入/支出變化） -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">分類</label>
        <select
          v-model="editedRecord.categoryId"
          class="mt-1 block w-full border rounded-md px-3 py-2"
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

      <!-- 其他欄位（照原本） -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">金額</label>
        <input
          v-model="editedRecord.itemPrice"
          type="number"
          class="mt-1 block w-full border rounded-md px-3 py-2"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">日期</label>
        <input
          v-model="editedRecord.itemDate"
          type="date"
          class="mt-1 block w-full border rounded-md px-3 py-2"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">備註</label>
        <input
          v-model="editedRecord.itemNote"
          type="text"
          class="mt-1 block w-full border rounded-md px-3 py-2"
        />
      </div>

      <div class="flex justify-end">
        <button
          class="mr-3 text-gray-500 hover:underline"
          @click="$emit('close')"
        >
          取消
        </button>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="emitSave"
        >
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
