import { apiFetch } from "./api";

const api = import.meta.env.VITE_API_URL;
export const categoryGet = async ()=>{

    try {
        
        const response = await apiFetch(`${api}/api/category/list`,{
            method:"POST",
        });

        return response;

    } catch (error) {
        throw error;
    }

}