<script setup>
import accountpng from "@/assets/jpg/account.png";
import { computed, ref } from "vue";
import { addAccount } from "@/api/account";
import router from "@/router";
import { useToast } from "vue-toastification";

const accountPic = ref(accountpng);
const toast = useToast();

const serverErrors = ref({});
const touched = ref({
  name: false,
  description: false,
  initialAmount: false,
});

const accountData = ref({
  name: "",
  description: "",
  initialAmount: "",
  isPublic: false,
});

const errors = computed(() => ({
  name:
    (serverErrors.value.name || !accountData.value.name) && touched.value.name,
  description:
    (serverErrors.value.description || !accountData.value.description) &&
    touched.value.description,
  initialAmount:
    (serverErrors.value.initialAmount || !accountData.value.initialAmount) &&
    touched.value.initialAmount,
}));

const handleBlur = (field) => {
  serverErrors.value[field] = "";
  touched.value[field] = true;
};

const handleAddAccount = async () => {
  serverErrors.value = {};
  const data = await addAccount(accountData.value);
  if (data.status === "error") {
    serverErrors.value = data.errors || {};
    Object.keys(touched.value).forEach((key) => {
      touched.value[key] = true;
    });
    return;
  }
  toast.success("新增成功");
  router.push("/dashboard/accountList");
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="accountPic" alt="Your Company" />
      <h1 class="auth-title">新增帳戶</h1>
    </div>
    <div class="auth-box-form">
      <form
        @submit.prevent="handleAddAccount"
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label for="name" class="auth-label">帳戶名稱</label>
          <div class="mt-2">
            <input
              v-model="accountData.name"
              v-on:blur="handleBlur('name')"
              type="text"
              name="name"
              id="name"
              class="input-primary"
              :class="{
                'input-error': errors.name,
              }"
            />
          </div>
          <p v-if="errors.name" class="p-error">
            {{ serverErrors.name || "請輸入帳號名稱" }}
          </p>
        </div>

        <div>
          <label for="description" class="auth-label">帳戶描述</label>
          <div class="mt-2">
            <textarea
              v-model="accountData.description"
              v-on:blur="handleBlur('description')"
              class="textarea-primary"
              :class="{ 'textarea-error': errors.description }"
              name="description"
              id="description"
              rows="4"
            ></textarea>
          </div>

          <p v-if="errors.description" class="p-error">
            {{ serverErrors.description || "請輸入帳戶描述" }}
          </p>
        </div>

        <div>
          <label for="initial_amount" class="auth-label">帳戶金額</label>
          <div class="mt-2">
            <input
              v-model="accountData.initialAmount"
              v-on:blur="handleBlur('initial_amount')"
              type="number"
              name="initial_amount"
              id="initial_amount"
              class="input-primary"
              :class="{ 'input-error': errors.initialAmount }"
            />
          </div>
          <p v-if="errors.initialAmount" class="p-error">
            {{ serverErrors.initialAmount || "請輸入帳戶金額" }}
          </p>
        </div>

        <div>
          <label for="is_public" class="auth-label">是否公開</label>
          <select
            v-model="accountData.isPublic"
            class="select-primary"
            name="isPublic"
            id="isPublic"
          >
            <option :value="false">否</option>
            <option :value="true">是</option>
          </select>
        </div>

        <div>
          <p class="p-error"></p>
        </div>

        <div class="pb-8">
          <button type="submit" class="button-primary">Add</button>
          <button
            @click="router.push('/dashboard/accountList')"
            type="button"
            class="mt-2 text-blue-500 hover:underline text-sm"
          >
            ← 返回
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
