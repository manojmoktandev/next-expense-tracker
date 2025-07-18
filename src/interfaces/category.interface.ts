export interface ICategory{
    name:string;
    description?:string;
}

export interface ICategoryResponse {
    name:string,
    description?:string;
    id:string;
    createdAt:string;
    updatedAt:string
}