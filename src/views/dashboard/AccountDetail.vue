<script setup>
import accountpng from "@/assets/jpg/account.png";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getAccount, updateAccount, deleteAccount } from "@/api/account";
import { API_URL } from "@/stores/config.js";
import router from "@/router";
import CustomConfirm from "@/components/modal/customConfirm.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const accountPic = ref(accountpng);
const selectedFile = ref(null);
const accountData = ref({
  name: "",
  description: "",
  image: "",
  initialAmount: "",
  isPublic: "",
});
const serverErrors = ref({});
const route = useRoute();
const showConfirm = ref(false);

onMounted(async () => {
  const accountId = route.params.accountId;
  const result = await getAccount(accountId);
  if (result.status === "error") {
    toast.error("取得失敗，請稍後再試");
  } else {
    accountData.value = result.data;
  }
});

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const imageUrl = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value);
  }
  return `${API_URL}${accountData.value.image}`;
});

const handleSaveData = async () => {
  serverErrors.value = {};
  const formData = new FormData();
  formData.append(
    "data",
    new Blob(
      [
        JSON.stringify({
          name: accountData.value.name,
          description: accountData.value.description,
          image: accountData.value.image,
          initialAmount: accountData.value.initialAmount,
          isPublic: accountData.value.isPublic,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  if (selectedFile.value) {
    formData.append("file", selectedFile.value);
  }

  try {
    const accountId = route.params.accountId;
    const data = await updateAccount(accountId, formData);
    toast.success("更新成功");
    router.push("/dashboard/accountList");
  } catch (error) {
    serverErrors.value = error.errors;
  }
};
const handleDeleteAccount = async () => {
  serverErrors.value = {};
  const accountId = route.params.accountId;
  const data = await deleteAccount(accountId);
  showConfirm.value = false;
  if (data.status === "error") {
    serverErrors.value = data.errors;
    return;
  }

  router.push("/dashboard/accountList");
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="accountPic" alt="Your Company" />
      <h1 class="auth-title">帳戶設定</h1>
    </div>
    <div class="auth-box-form">
      <form
        @submit.prevent="handleSaveData"
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label for="name" class="auth-label">圖片上傳</label>
          <div>
            <input
              v-on:change="handleFileChange"
              type="file"
              accept="image/*"
              class="input-primary"
            />
          </div>
          <div class="mt-4 auth-label">
            <p>圖片預覽</p>
            <img
              :src="imageUrl"
              alt="Preview"
              class="w-40 h-40 object-cover rounded-full border"
            />
          </div>
        </div>

        <div>
          <label for="name" class="auth-label">帳戶名稱</label>
          <div class="mt-2">
            <input
              v-model="accountData.name"
              type="text"
              name="name"
              id="name"
              class="input-primary"
            />
          </div>
        </div>

        <div>
          <label for="description" class="auth-label">帳戶描述</label>
          <div class="mt-2">
            <textarea
              v-model="accountData.description"
              class="textarea-primary"
              name="description"
              id="description"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div>
          <label for="initialAmount" class="auth-label">帳戶金額</label>
          <div class="mt-2">
            <input
              v-model="accountData.initialAmount"
              type="number"
              name="initialAmount"
              id="initialAmount"
              class="input-primary"
            />
          </div>
        </div>

        <div>
          <label for="isPublic" class="auth-label">是否公開</label>
          <select v-model="accountData.isPublic" class="select-primary" name="isPublic" id="isPublic">
            <option :value="false">否</option>
            <option :value="true">是</option>
          </select>
        </div>

        <p v-if="serverErrors.general" class="p-error">
          {{ serverErrors.general }}
        </p>

        <div class="pb-8">
          <button type="submit" class="button-primary">Save</button>
          <button
            @click="showConfirm = true"
            type="button"
            class="button-alarm mt-2"
          >
            Delete Account
          </button>
          <button
            @click="router.push('/dashboard/accountList')"
            type="button"
            class="mt-2 text-blue-500 hover:underline text-sm"
          >
            ← 返回
          </button>
        </div>
      </form>
      <CustomConfirm
        :show="showConfirm"
        @confirm="handleDeleteAccount"
        @cancel="showConfirm = false"
      />
    </div>
  </div>
</template>

<style scoped></style>
