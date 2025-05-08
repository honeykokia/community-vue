import { apiFetch } from "./api";

const api = import.meta.env.VITE_API_URL;
export const getAllCategory = async ()=>{

    try {
        const response = await apiFetch(`${api}/category`,{
            method:"GET",
        });

        return response;

    } catch (error) {
        throw error;
    }

}