/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Table from "../common/table"
import {
    createColumnHelper
} from '@tanstack/react-table'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllCategoryByUser, deleteCategory } from "@/api/category.api"
import toast from "react-hot-toast"
import {  formatDate } from "@/utils/dateFormatter"
import ActionButtons from "@/components/common/list-action-button"
import { useCallback } from "react"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter } from "next/navigation"
import Loader from "../common/loader"
//import AppRouteRouteModule from "next/dist/server/route-modules/app-route/module"

const CategoryList = () => {
    const router =  useRouter()
    const columnHelper = createColumnHelper<any>()
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryFn: getAllCategoryByUser,
        queryKey: ['get-all-user-category']
    })

    const { mutate } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (response) => {
            toast.success(response.message ?? 'Category deleted')
            queryClient.invalidateQueries({ queryKey: ['get-all-user-category'] })
        },
        onError: (error) => {
            toast.error(error.message ?? 'Can not perform this task.')
        }
    })

    const onDelete = useCallback((id: string) => {
        confirmAlert({
            title: 'Category Delete Confirmation',
            message: 'Are you sure to do delete the category?.',
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

    const onEdit = useCallback((id:string) => {
        router.push(`/categories/update/${id}`);
    }, [router])

    const onView = useCallback((id:string) =>{
        router.push(`/categories/view/${id}`)
    },[router])

    if (error) {
        toast.error(error?.message ?? 'Something went wrong')
        return
    }
    if(isLoading){
       <Loader/>
    }

    const columns = [
        columnHelper.accessor('name', {
            id: 'name',
            cell: info => info.getValue(),
            header: () => <span>Category Name</span>,
        }),
        columnHelper.accessor(row => row.description, {
            id: 'description',
            cell: info => info.getValue() ?? '-',
            header: () => <span>Description</span>
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
            cell: (info) => <ActionButtons onDelete={() => onDelete(info.row.original.id)} onEdit={()=>onEdit(info.row.original.id)} onView={()=>onView(info.row.original.id)} />
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

export default CategoryList