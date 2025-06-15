import { ICategoryResponse } from "./category.interface";

interface ICategoryOption {
    label:string,
    value:string
}

interface IImage{
    path:string,
    public_id:string
}
export interface IExpense{
    title:string;
    amount:number;
    date:string;
    category:ICategoryOption | string;
    receipts?:File[],
    description?:string;
}

export interface IExpenseResponse{
    id:string,
    title:string,
    amount:number,
    date:string,
    category:ICategoryResponse,
    receipts?:IImage,
    description?:string,
    createdAt:string,
    updatedAt:string
}
