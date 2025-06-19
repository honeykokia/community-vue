import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { CustomError } from "@/utils/CustomError";

export const apiFetch = async (url, options={}) => {


  const authStore = useAuthStore();
  const token = authStore.token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {...options, headers})
    .then(async (response) => {

      if (response.status === 401) {
        authStore.logout();
        router.push("/login")
        throw new CustomError({general: "逾時請重新登入"});
      }else if (response.status === 429){
        authStore.logout();
        router.push("/login")
        throw new CustomError({general: "請求過於頻繁，請稍後再試"});
      }

      return response.json(); 

    }).catch(error => {
      console.error("API Error", error);

      if(typeof error === "object" && error.errors){
        throw error;
      }else{
        throw new CustomError({general: "發生錯誤"})
      }
    });
};