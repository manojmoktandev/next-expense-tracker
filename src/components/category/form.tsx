'use client'
import { createCategory, updateCategory } from "@/api/category.api"
import { CategorySchema } from "@/schema/category.schema"
import { ICategory,ICategoryResponse } from "@/interfaces/category.interface"
import { useForm } from "react-hook-form"
import { Input } from "../common/inputs/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface IProps  {
    category?:ICategoryResponse
}

const getCategoryUpdateData = (data:ICategoryResponse)=>{
    return {
        name:data.name,
        description:data.description
    }

}


const CategoryForm:React.FC<IProps> = ({category})=>{
    const router = useRouter()
    const queryClient =  useQueryClient()
    
    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            name:category?.name ?? '',
            description:category?.description ?? ''
        },
        resolver:yupResolver(CategorySchema)
    })

    /*create category mutuation*/ 
    const {mutate,isPending} = useMutation({
        mutationFn:createCategory,
        onSuccess:(data) =>{
            toast.success(data?.message ?? 'Category Added.')
            router.push('/categories')
            queryClient.invalidateQueries({queryKey:['get-all-user-category']})
        },
        onError:(data) =>{
            toast.error(data?.message ?? 'Operation failed.')
        }
    })

    /* update category mutuation*/ 

    const {mutate:update,isPending:isUpdatePending} =  useMutation({
        mutationFn:(data:ICategory)=>updateCategory(data,category?.id ?? ''),
        onSuccess:(data)=>{
            toast.success(data?.message ?? 'category updated')
            router.push('/categories')
            queryClient.invalidateQueries({queryKey:['get-all-user-category']})
        },
        onError:(data)=>{
            toast.error(data?.message ?? 'operation failed')
        }
    })

    useEffect(()=>{
        if(category){
            const categoryData = getCategoryUpdateData(category);
            console.log('use data',categoryData)
        }
    },[category])

    const onSubmit = (data:ICategory) =>{
        if(category){
            update(data)
            //data)
        }
        else{
            mutate(data)
        }
            
    }
    console.log(register);
    return(
         <div className="max-w-2xl mt-2 mx-auto p-6 bg-white rounded-lg shadow-md  tracking-wide">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6"></h2> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-6">
                <Input
                       label={'Name'}
                        name={'name'}
                        required
                        error={errors?.name?.message}
                        register={register}
                        placeholder={'"e.g. Electronics, Clothing"'}
                   />
                </div>

                {/* Description Field */}
                <div className="mb-6">
                    <Input multiline
                       label={'Description'}
                        name={'description'}
                        error={errors?.description?.message}
                        register={register}
                        placeholder={'"Describe the category..."'}
                   />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">

                {category ? <button
                    type="submit" disabled={isUpdatePending}
                    className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                >
                    {isUpdatePending ? 'Updating' : 'Update'}
                </button> 
                :
                <button
                    type="submit" disabled={isPending}
                    className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                >
                    {isPending ? 'Creating' : 'Create'}
                </button>
                }
                </div>
            </form>
        </div>
    )
}

export default CategoryForm