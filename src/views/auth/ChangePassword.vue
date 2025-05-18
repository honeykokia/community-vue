<script setup>
import logo from "@/assets/jpg/logo.png";
import { computed, ref } from "vue";
import { memberChangePassword } from "@/api/auth";
import router from "@/router";
import { useToast } from "vue-toastification";

const toast = useToast();
const logoJpg = ref(logo);
const serverErrors = ref({});
const changeData = ref({
  oldPassword: "",
  password: "",
  confirmPassword: "",
});
const touched = ref({
  oldPassword: false,
  password: false,
  confirmPassword: false,
});
const errors = computed(() => ({
  oldPassword:
    (serverErrors.value.oldPassword || !changeData.value.oldPassword) &&
    touched.value.oldPassword,
  password:
    (serverErrors.value.password || !changeData.value.password) &&
    touched.value.password,
  confirmPassword:
    (serverErrors.value.confirmPassword || !changeData.value.confirmPassword) &&
    touched.value.confirmPassword,
}));
const handleBlur = (field) => {
  //   serverErrors.value[field] = "";
  touched.value[field] = true;
};
const changePassword = async () => {
  serverErrors.value = {};
  const fetchData = await memberChangePassword(changeData.value);
  if (fetchData.status === "error") {
    serverErrors.value = fetchData.errors || {};
    Object.keys(touched.value).forEach((key) => {
      touched.value[key] = true;
    });
  } else {
    toast.success("密碼修改成功");
    router.push("/member");
  }
};
</script>
<template>
  <div class="auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company" />
      <h2 class="auth-title">修改密碼</h2>
    </div>
    <div class="auth-box-form">
      <form
        @submit.prevent="handleRegister"
        class="space-y-8"
        action="#"
        method="PATCH"
      >
        <div>
          <label for="old-password" class="auth-label">舊密碼</label>
          <div class="mt-2">
            <input
              v-on:blur="handleBlur('oldPassword')"
              v-model="changeData.oldPassword"
              type="password"
              id="old-password"
              class="input-primary"
              placeholder="請輸入舊密碼"
              :class="{
                'input-error': errors.oldPassword,
              }"
            />
            <p v-if="errors.oldPassword" class="p-error">
              {{ serverErrors.oldPassword || "請輸入舊密碼" }}
            </p>
          </div>
        </div>
        <div>
          <label for="password" class="auth-label">新密碼</label>
          <div class="mt-2">
            <input
              v-on:blur="handleBlur('password')"
              v-model="changeData.password"
              type="password"
              id="password"
              class="input-primary"
              :class="{
                'input-error': errors.password,
              }"
              placeholder="請輸入新密碼"
            />
            <p v-if="errors.password" class="p-error">
              {{ serverErrors.password || "請輸入新密碼" }}
            </p>
          </div>
        </div>
        <div>
          <label for="confirmPassword" class="auth-label">確認新密碼</label>
          <div class="mt-2">
            <input
              v-on:blur="handleBlur('confirmPassword')"
              v-model="changeData.confirmPassword"
              type="password"
              id="confirmPassword"
              class="input-primary"
              :class="{
                'input-error': errors.confirmPassword,
              }"
              placeholder="請再次輸入新密碼"
            />
            <p v-if="errors.confirmPassword" class="p-error">
              {{ serverErrors.confirmPassword || "請輸入確認新密碼" }}
            </p>
          </div>
        </div>
        <div>
          <button type="submit" @click="changePassword" class="button-primary">
            確認
          </button>
          <button @click="router.push('/member')" class="mt-2 text-blue-500 hover:underline text-sm">
            ← 返回
          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
