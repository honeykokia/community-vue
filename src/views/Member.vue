<script setup>
import logo from "@/assets/jpg/logo.png";
import avatar from "@/assets/jpg/avatar.jpg";
import { computed, onMounted, ref } from "vue";
import { member , memberSave} from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";

const logoJpg = ref(logo);

const selectedFile = ref(null);
const serverErrors = ref({});
const memberData = ref({
  image: "",
  name: "",
  birthday: "",
  email: "",
  gender: "",
  password: "",
});

const pictureUrl = computed(() => {

  if(selectedFile.value){
    return URL.createObjectURL(selectedFile.value);
  }
  if (!memberData.value.image) {
    return "";
  }
  return `${import.meta.env.VITE_API_URL}${memberData.value.image}`;
});

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = e.target.files[0];
  }
};

const getMember = async () => {
  serverErrors.value = {};
  try {
    const fetchdata = await member();
    memberData.value = fetchdata.data;

  } catch (error) {
    serverErrors.value = error.errors;
  }
};

onMounted(() => {
  getMember();
});

const handleSaveData = async () =>{
  serverErrors.value = {};
  const formData = new FormData();
  // formData.append('name', memberData.value.name);
  // formData.append('birthday', memberData.value.birthday);
  // formData.append('password', memberData.value.password);
  formData.append('data',JSON.stringify(
    {
      name: memberData.value.name,
      birthday: memberData.value.birthday,
      password: memberData.value.password
    }));
    
  //   formData.append(
  //   "data",
  //   new Blob(
  //     [
  //       JSON.stringify({
  //         name: memberData.value.name,
  //         birthday: memberData.value.birthday,
  //         password: memberData.value.password,
  //       }),
  //     ],
  //     {
  //       type: "application/json",
  //     }
  //   )
  // );
  if (selectedFile.value) {
    formData.append('file', selectedFile.value);
  }

  try {
    const data = await memberSave(formData);
    console.log(data);
  } catch (error) {
    console.log(error);
    serverErrors.value = error.errors;
  }
}

</script>

<template>
  <div class=".auth-container">
    <div class="auth-box">
      <img class="mx-auto h-36 w-auto" :src="logoJpg" alt="Your Company" />
      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-600">
        會員資料
      </h2>
    </div>
    <div class="auth-box-form">
      <form @submit.prevent="handleSaveData" enctype="multipart/form-data" class="space-y-6" action="#" method="POST">
        <div>
          <label for="name" class="auth-label">大頭貼上傳</label>
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
              :src="pictureUrl"
              alt="Preview"
              class="w-40 h-40 object-cover rounded-full border"
            />
          </div>
        </div>
        <div>
          <label for="name" class="auth-label">姓名</label>
          <div>
            <input
              v-model="memberData.name"
              type="text"
              name="name"
              id="name"
              class="input-primary"
            />
          </div>
        </div>
        <div>
          <label for="birthday" class="auth-label">生日</label>
          <div>
            <input
              v-model="memberData.birthday"
              type="date"
              name="birthday"
              id="birthday"
              class="input-primary"
            />
          </div>
        </div>

        <div>
          <label for="email" class="auth-label">性別</label>
          <div>
            <input
              v-model="memberData.gender"
              type="text"
              name="gender"
              id="gender"
              class="input-primary"
              disabled
            />
          </div>
        </div>
        <div>
          <label for="email" class="auth-label">信箱</label>
          <div>
            <input
              v-model="memberData.email"
              type="text"
              name="email"
              id="email"
              class="input-primary"
              disabled
            />
          </div>
        </div>
        <div>
          <label for="password" class="auth-label">密碼</label>
          <div>
            <input
              v-model="memberData.password"
              type="text"
              name="passowrd"
              id="password"
              class="input-primary"
            />
          </div>
        </div>
        <p v-if="serverErrors.general" class="p-error">
          {{ serverErrors.general }}
        </p>
        <div>
          <button type="submit" class="button-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input-text {
  @apply block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6;
}
</style>
