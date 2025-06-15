import *  as yup from "yup";
export const CategorySchema = yup.object({
    name:yup.string().required('Category Name  is required'),
    description:yup.string()
})