'use client'
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Input } from "../common/inputs/input"
import { useRouter } from "next/navigation"
import ImageUploader from "../common/inputs/file-upload"
import SelectCategory from "../common/inputs/category-select-input"
import { IExpense } from "@/interfaces/expense.interface"
import expenseSchema from "@/schema/expense.schema"
import { createExpenses } from "@/api/expenses.api"
const ExpenseForm = ()=>{
    const router = useRouter()
    const queryClient =  useQueryClient()
    const {control,register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            title:'',
            description:'',
            date:'',
            category:'',
            receipts:[]
        },
        resolver:yupResolver(expenseSchema)
    })

    const {mutate,isPending} = useMutation({
        mutationFn:createExpenses,
        onSuccess:(data) =>{
            console.log('mutuate data', data)
            toast.success(data?.message ?? 'Expenses  Added.')
            router.back()
            queryClient.invalidateQueries({queryKey:['get-all-user-expenses']})
        },
        onError:(data) =>{
            toast.error(data?.message ?? 'Operation failed.')
        }
    })

    const onSubmit = (data:IExpense) =>{
        const {title,amount,date,category,description,receipts} =  data;
        const formData =  new FormData()
        formData.append('title',title);
        formData.append('amount',amount.toString());
        formData.append('date',date);
        formData.append('category',typeof category==='string' ? category :  category?.value)
        if(description){
            formData.append('description',description);
        }
        console.log('form category',category)
        
        if(receipts &&  receipts?.length > 0 && Array.isArray(receipts)){
            receipts.forEach((file) =>{
                formData.append('receipts',file)
            })
        }
        console.log(formData);
        mutate(formData)
    }

    return(
         <div className="max-w-2xl mt-2 mx-auto p-6 bg-white rounded-lg shadow-md  tracking-wide">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Expenses</h2>
            
            {/* @ts-expect-error  //onsubmit error*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-6">
                    <Input
                        label={'Name'}
                            name={'title'}
                            required
                            error={errors?.title?.message}
                            register={register}
                            placeholder={'Entertainement'}

                    />
                </div>

                <div className="mb-6">
                        <SelectCategory error={errors.category?.message} required label="Select Category Expenses" control={control} />
                </div>

                 <div className="mb-6">
                <Input
                       label={'Billing Amount'}
                        name={'amount'}
                        required
                        error={errors?.amount?.message}
                        register={register}
                        placeholder={'0.00'}
                        type="text"
                   />
                </div>
                 <div className="mb-6">
                <Input
                       label={'Billing Date'}
                        name={'date'}
                        required
                        error={errors?.date?.message}
                        register={register}
                        placeholder={''}
                        type="date"
                   />
                </div>

                <div className='flex flex-col gap-1'>
           
                    <ImageUploader label={'Receipt'} name='receipts' control={control}/>
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
                <button
                    type="submit" disabled={isPending}
                    className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                >
                    {isPending ? 'Creating' : 'Create'}
                </button>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm