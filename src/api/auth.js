import { useAuthStore } from "@/stores/authStore";
import { apiFetch } from "./api";
import { toRaw } from "vue";
import { apiFileUpload } from "./fileUpload";

const api = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  try {

    const rawData = toRaw(data);
    const response = await apiFetch(`${api}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(rawData),
    });

    const authStore = useAuthStore();
    if(response.token) {
        authStore.login(response.token);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {

    const rawData = toRaw(data);
    const response = await apiFetch(`${api}/api/user/register`, {
      method: "POST",
      body: JSON.stringify(rawData),
    });

    const authStore = useAuthStore();
    if(response.token) {
        authStore.login(response.token);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
}

export const resendVerifyMail = async(data) =>{
  const {email} = data;

  try {
    const response = await apiFetch(`${api}/api/user/resendMail`,{
      method:"POST",
      body: JSON.stringify({email: email}),
    });
    return response
  } catch (error) {
    throw error;
  }

}

export const memberGet = async()=>{
  try{
    const response = await apiFetch(`${api}/api/user/member`,{
      method:"POST",
    });

    return response;
  }catch(error){
    throw error;
  }
}

export const memberSave = async(formdata)=>{
  try {
    const response = await apiFileUpload(`${api}/api/user/member`,formdata);
    return response;
  } catch (error) {
    throw error;
  }
}

export const memberChangePassword = async(data)=>{
  try {
    const rawData = toRaw(data);
    const response = await apiFetch(`${api}/api/user/member`,{
      method:"PATCH",
      body: JSON.stringify(rawData),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
