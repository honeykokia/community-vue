import { toRaw } from "vue";
import { apiFetch } from "./api";

const api = import.meta.env.VITE_API_URL;
export const addRecord = async (accountId,data) => {
  try {
    const rawData = toRaw(data);
    const response = await apiFetch(`${api}/api/accounts/${accountId}/records`, {
      method: "POST",
      body: JSON.stringify(rawData),
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const getRecordByAccountId = async (accountId) => { 
  try {
    const response = await apiFetch(`${api}/api/accounts/${accountId}/records`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
}