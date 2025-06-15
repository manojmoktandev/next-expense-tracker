'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "../common/table"
import {
    createColumnHelper
} from '@tanstack/react-table'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllExpenseByUser, deleteExpense } from "@/api/expenses.api"
import toast from "react-hot-toast"
import {  formatDate } from "@/utils/dateFormatter"
import ActionButtons from "@/components/common/list-action-button"
import { useCallback } from "react"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { formatCurrency } from "@/utils/currencyFormatter"
import Loader from "../common/loader"

const ExpensesList = () => {
    const columnHelper = createColumnHelper<any>()
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryFn: getAllExpenseByUser,
        queryKey: ['get-all-user-expense']
    })

    const { mutate } = useMutation({
        mutationFn: deleteExpense,
        onSuccess: (response) => {
            toast.success(response.message ?? 'Expense deleted')
            queryClient.invalidateQueries({ queryKey: ['get-all-user-expense'] })
        },
        onError: (error) => {
            toast.error(error.message ?? 'Can not perform this task.')
        }
    })

    const onDelete = useCallback((id: string) => {
        confirmAlert({
            title: 'Expense Delete Confirmation',
            message: 'Are you sure to do delete the expense?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => mutate(id)
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }, [mutate])

    const onEdit = useCallback(() => {
        console.log('Edit button clicked')
    }, [])

    if(isLoading){
        <Loader/>
    }

    if (error) {
        toast.error(error?.message ?? 'Something went wrong')
        return
    }


    const columns = [
        columnHelper.accessor('title', {
            id: 'title',
            cell: info => info.getValue(),
            header: () => <span>Expenses Title</span>,
        }),
         columnHelper.accessor('date', {
            id: 'date',
            cell: info => formatDate(info.renderValue()) ?? '-',
            header: () => <span>Expense Created</span>
        }),
        columnHelper.accessor('amount', {
            id: 'amount',
            cell: info =>  formatCurrency(info.getValue(),'USD'),
            header: () => <span>Amount</span>
        }),
        columnHelper.accessor(row => row.category?.name, {
            id: 'category',
            cell: info => info.getValue() ?? '-',
            header: () => <span>Category</span>
        }),
        columnHelper.accessor('createdAt', {
            header: () => <span>Created At</span>,
            cell: info => formatDate(info.renderValue())
        }),
        columnHelper.accessor('updatedAt', {
            header: () => <span>Updated At</span>,
            cell: info => formatDate(info.renderValue())
        }),
        columnHelper.accessor('actions', {
            header: () => <span>Actions</span>,
            cell: (info) => <ActionButtons onDelete={() => onDelete(info.row.original.id)} onEdit={onEdit} />
        }),
    ]

    return (
        <div className="container mx-auto px-2 py-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <Table data={data?.data} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default ExpensesList