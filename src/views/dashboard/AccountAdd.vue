<script setup>
import accountpng from "@/assets/jpg/account.png";
import { computed, ref } from "vue";
import { addAccount } from "@/api/account";
import router from "@/router";
const accountPic = ref(accountpng);

const serverErrors = ref({});
const touched = ref({
  name: false,
  description: false,
  initial_amount: false,
});

const accountData = ref({
  name: "",
  description: "",
  initial_amount: "",
  is_public: false,
});

const errors = computed(() => ({
  name:
    (serverErrors.value.name || !accountData.value.name) && touched.value.name,
  description:
    (serverErrors.value.description || !accountData.value.description) &&
    touched.value.description,
  initial_amount:
    (serverErrors.value.initial_amount || !accountData.value.initial_amount) &&
    touched.value.initial_amount,
}));

const handleBlur = (field) => {
  serverErrors.value[field] = "";
  touched.value[field] = true;
};

const handleAddAccount = async () => {
  serverErrors.value = {};
  console.log(typeof accountData.value.is_public)
  const data = await addAccount(accountData.value);
  console.log(data);
  if (data.status === "error") {
    serverErrors.value = data.errors || {};
    Object.keys(touched.value).forEach((key) => {
      touched.value[key] = true;
    });
    return;
  }

//   alert("新增成功");
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
              v-model="accountData.initial_amount"
              v-on:blur="handleBlur('initial_amount')"
              type="number"
              name="initial_amount"
              id="initial_amount"
              class="input-primary"
              :class="{ 'input-error': errors.initial_amount }"
            />
          </div>
          <p v-if="errors.initial_amount" class="p-error">
            {{ serverErrors.initial_amount || "請輸入帳戶金額" }}
          </p>
        </div>

        <div>
          <label for="is_public" class="auth-label">是否公開</label>
          <select v-model="accountData.is_public" class="select-primary" name="is_public" id="is_public">
            <option :value="false">否</option>
            <option :value="true">是</option>
          </select>
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
