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
import { createExpenses, updateExpense } from "@/api/expenses.api"
import { IExpenseResponse } from "@/interfaces/expense.interface"
import { useEffect, useState } from "react"
import { DateFormats, formatDate } from "@/utils/dateFormatter"

interface IProps {
    expense?:IExpenseResponse
}

const getExpenseUpdateData = (data:IExpenseResponse)=>{
    return {
        title:data.title,
        description:data.description,
        date:data.date,
        amount:data.amount,
        category:data.category.id,
        receipts:data?.receipts?.map(r => r.path) || []
    }
}

const ExpenseForm:React.FC<IProps> = ({expense})=>{
    const router = useRouter()
    const queryClient =  useQueryClient()
    
    const {control,register,handleSubmit,formState:{errors},reset} = useForm({
        defaultValues:{
            title: '',
            amount: 0.00,
            description: '',
            date: '',
            category: '',
            receipts:  []
        },
        resolver:yupResolver(expenseSchema)
    })

    const {mutate,isPending} = useMutation({
        mutationFn:createExpenses,
        onSuccess:(data) =>{
            toast.success(data?.message ?? 'Expenses  Added.')
            router.back()
            queryClient.invalidateQueries({queryKey:['get-all-user-expenses']})
        },
        onError:(data) =>{
            toast.error(data?.message ?? 'Operation failed.')
        }
    })

    /* update expense mutuation*/ 
    const {mutate:update,isPending:isUpdatePending} =  useMutation({
        mutationFn:(data:IExpense)=>updateExpense(data,expense?.id ?? ''),
        onSuccess:(data)=>{
            toast.success(data?.message ?? 'Expense updated')
            router.back()
            queryClient.invalidateQueries({queryKey:['get-all-user-expenses']})
        },
        onError:(data)=>{
            toast.error(data?.message ?? 'Operation failed.')
        }
    })

    useEffect(()=>{
        if(expense){
            const expenseData = getExpenseUpdateData(expense);
            const date = expense?.date.split('T')[0]??'';
            
            reset({
                title:expense?.title ?? '',
                description:expense?.description ?? '',
                amount:expense?.amount ?? '',
                date:date,
                category:expense?.category.id ?? '',
                receipts: expense?.receipts?.map(r=>r.path) ?? []
            })
        }
    },[expense,reset])

    const onSubmit = (data:IExpense) =>{
        debugger;
        const {title,amount,date,category,description,receipts} =  data;
        const formData =  new FormData()
        formData.append('title',title);
        formData.append('amount',amount.toString());
        formData.append('date',date);
        formData.append('category',typeof category==='string' ? category :  category?.value)
        if(description){
            formData.append('description',description);
        }
        
        if(receipts &&  receipts?.length > 0 && Array.isArray(receipts)){
            receipts.forEach((file) =>{
                if (file instanceof File) {
                    formData.append('receipts', file);
                }
                // formData.append('receipts',file)
            })
        }
        if(expense){
            //update(data)
            update(formData)
        }
        else{
            mutate(formData)
        }
    }
    return(
         <div className="max-w-2xl mt-2 mx-auto p-6 bg-white rounded-lg shadow-md  tracking-wide">
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
                        <SelectCategory error={errors.category?.message} required label="Select Category Expenses"  
                        defaultValue={expense?.category?.id || ""}  control={control} />
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
                    {
                    expense ? <button
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

export default ExpenseForm