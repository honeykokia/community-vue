import { useAuthStore } from "@/stores/authStore";
import { CustomError } from "@/utils/CustomError";

export const apiFileUpload = async(url,formdata) =>{

    const authStore = useAuthStore();
    const token = authStore.token;
    const headers = {};

    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url,{
        method:"PUT",
        body:formdata,
        headers:headers,
    }).then(async(response)=>{
        if(response.status === 401){
            authStore.logout();
            router.push("/login");
            throw new CustomError({general:"逾時請重新登入"});
        }
        return response.json();
    }).catch(error=>{
        console.error("API Error",error);

        if(typeof error === "object" && error.errors){
            throw error;
        }else{
            throw new CustomError({general:"發生錯誤"});
        }
    });
};