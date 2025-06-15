import { ILogin, IRegister } from "@/interfaces/auth.interface";
import { AxiosError } from "axios";
import apiInstance from ".";
export const login = async(data:ILogin)=>{
    try {
        const response  = await apiInstance.post(`/user/login`,data)
        return response.data;
        
    } catch (error:unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data ?? new Error('Unknown Axios error');
        }
        // Handle non-Axios errors
        throw new Error('Unknown error occurred');
    }
}

export const register =  async(data:Omit<IRegister,'confirmPassword'>)=>{
    try {
        const response =  await apiInstance.post(`/user/register`,data)
        return response.data
        
    } catch (error:unknown) {
         if (error instanceof AxiosError) {
            throw error.response?.data ?? new Error('Unknown Axios error');
        }
        // Handle non-Axios errors
        throw new Error('Unknown error occurred');
    }
}