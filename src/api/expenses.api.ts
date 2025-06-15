/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "."
// import { IExpense } from "@/interfaces/expense.interface";

export const getAllExpenseByUser = async()=>{
    try{
        const response =  await apiInstance.get(`/expense/getall/user`);
        return response.data;
    }
    catch(error:any){
        throw  error.response.data
    }
}

export const createExpenses =  async(data:any)=>{
    try{
        const response  =  await apiInstance.post(`/expense/create`,data);
        return response.data;

    }
    catch(error:any){
        throw  error.response.data
    }
}

export const deleteExpense =  async(id:string)=>{
    try{
        const response = apiInstance.delete(`/expense/${id}`)
        return (await response).data;

    }
    catch(error:any){
        throw error.response.data
    }
}
