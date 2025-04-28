import { toRaw } from "vue";
import { apiFetch } from "./api";

const api = import.meta.env.VITE_API_URL;
export const addRecord = async (accountId,data) => {
  try {
    const rawData = toRaw(data);
    const response = await apiFetch(`${api}/account/${accountId}/records`, {
      method: "POST",
      body: JSON.stringify(rawData),
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const getRecordByAccountId = async (accountId,page,startDate,endDate) => { 
  try {
    const response = await apiFetch(`${api}/account/${accountId}/records?page=${page-1}&startDate=${startDate}&endDate=${endDate}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteRecordById = async (accountId,recordId) => {
  try {
    console.log(accountId,recordId);
    const response = await apiFetch(`${api}/account/${accountId}/records/${recordId}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw error;
  }
}