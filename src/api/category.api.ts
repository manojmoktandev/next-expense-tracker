
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/interfaces/category.interface";
import apiInstance from ".";

export const createCategory =  async(data:ICategory)=>{
    try{
        const response =  await apiInstance.post(`/category/create`,data)
        return response.data;

    }
    catch(error:any){
        throw error.response.data

    }
}

export const getAllCategoryByUser =  async()=>{
    try{
        const response = await apiInstance.get(`/category/getall/user`);
        return response.data;
    }
    catch(error:any){
        throw  error.response.data

    }
}

export  const deleteCategory = async(id:string)=>{
    try{
        const response = await apiInstance.delete(`/category/${id}`);
        return response.data;
    }
    catch(error:any){
        throw error.response.data
    }
}

export const getCategoryById =  async(id:string)=>{
    try{
        const response = await apiInstance.get(`/category/${id}`);
        return response.data;
    }
    catch(error:any){
        throw error.response.data
    }

}

export const updateCategory =  async(data:ICategory,id:string)=>{
    try{
        const response =  await apiInstance.put(`/category/update/${id}`,data);
        return response.data;
    }
    catch(error:any){
        throw error.response.data;
    }
}