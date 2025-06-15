'use client'
import { getCategoryById } from '@/api/category.api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loader from '../common/loader'
import CategoryForm from './form'

type Props = {
    id:string
}

const UpdateCategory = ({id}:Props) => {
    const {data, isLoading} = useQuery({
        queryFn:()=>getCategoryById(id),
        queryKey:['get-category-by-id']
    })
    if(isLoading){
        <Loader/>
    }
    return (
        <CategoryForm category={data?.data} />
    )
}

export default UpdateCategory