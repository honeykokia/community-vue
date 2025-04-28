import { toRaw } from "vue";
import { apiFetch } from "./api";
import { apiFileUpload } from "./fileUpload";

const api = import.meta.env.VITE_API_URL;

export const getAllAccounts = async () =>{

    try {
        const response = await apiFetch(`${api}/account`,{
            method:"GET",
        });
        return response;
    } catch (error) {
        throw error;
    }

}

export const addAccount = async(data) =>{
    const rawData = toRaw(data)
    try {
        const response = await apiFetch(`${api}/account`,{
            method:"POST",
            body: JSON.stringify(rawData),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAccount = async(id) =>{
    try {
        const response = await apiFetch(`${api}/account/${id}`,{
            method:"GET",
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateAccount = async(id,formdata)=>{
  try {
    const response = await apiFileUpload(`${api}/account/${id}`,formdata);
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteAccount = async(id) =>{
    try {
        const response = await apiFetch(`${api}/account/${id}`,{
            method:"DELETE",
        });
        return response;
    } catch (error) {
        throw error;
    }
}