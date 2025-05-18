import './assets/main.css'
import "./styles/tailwind.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const options = {
  timeout: 2000  // 所有 toast 預設顯示 2 秒
}
app.use(Toast,options);
app.mount('#app')
