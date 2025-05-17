<script setup>
import logo from "@/assets/jpg/logo.png";
import { computed, onMounted, ref } from "vue";
import { forgetPasswordReset, memberChangePassword } from "@/api/auth";
import router from "@/router";
import { useRoute } from "vue-router";
const logoJpg = ref(logo);
const serverErrors = ref({});
const changeData = ref({
  resetToken:"",
  password: "",
  confirmPassword: "",
});
const touched = ref({
  password: false,
  confirmPassword: false,
});
const errors = computed(() => ({
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
  const fetchData = await forgetPasswordReset(changeData.value);
  if (fetchData.status === "error") {
    serverErrors.value = fetchData.errors || {};
    Object.keys(touched.value).forEach((key) => {
      touched.value[key] = true;
    });
  } else {
    alert("密碼修改成功");
    router.push("/login");
  }
};

const route = useRoute();
onMounted(() => {
  changeData.value.resetToken = route.params.resettoken;
});

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
          <button @click="router.push('/login')" class="mt-2 text-blue-500 hover:underline text-sm">
            ← 返回
          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
