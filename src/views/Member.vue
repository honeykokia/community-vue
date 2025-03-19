<script setup>
import logo from "@/assets/jpg/logo.png";
import avatar from "@/assets/jpg/avatar.jpg";
import { computed, onMounted, ref } from "vue";
import { member } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";


const logoJpg = ref(logo);

const authStore = useAuthStore();
const serverErrors = ref({});
const memberData =ref({
  image: "",
  name: "",
  birthday: "",
  email: "",
  gender: "",
  password: "",
});

const pictureUrl = computed(()=> `${import.meta.env.VITE_API_URL}${memberData.value.image}`);


const getMember = async () => {

  serverErrors.value = {};
  try {
    const fetchdata = await member();
    memberData.value = fetchdata.data;
    console.log(memberData.value.image);
  } catch (error) {
    serverErrors.value = error.errors;
  }

};

onMounted(()=>{
  getMember();
})

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
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="name" class="auth-label">大頭貼上傳</label>
          <div>
            <input
              type="file"
              accept="image/*"
              class="input-primary"
            />
          </div>
          <div class="mt-4">
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
              disabled
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
              disabled
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
              disabled
            />
          </div>
        </div>
        <p v-if="serverErrors.general" class="p-error">{{serverErrors.general}}</p>
        <div>
          <button type="button" class="button-primary">Edit</button>
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
