'use client'
import { getCategoryById } from '@/api/category.api';
import { formatDate } from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Loader from '../common/loader';

type Props = {
    id:string
}

const ViewCategoryDetail = (props:Props) => {
    const {id} = props;

    const {data, isLoading} =  useQuery({
        queryFn:()=> getCategoryById(id),
        queryKey:['get-category-by-id']
    })

    if (isLoading) {
        <Loader/>
    }
    const {name, description,user, createdAt, updatedAt} = data?.data 

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">Category Name</div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">{name}</div>

            </div>
             <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
               
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">Created By</div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">{user?.fullname}</div>
            </div>

            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
               
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">Created At</div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">{formatDate(createdAt)}</div>

            </div>

            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
               
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">UpdateAt</div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">{formatDate(updatedAt)}</div>

            </div>

            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">

                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">Description </div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">{description}</div>
                
            </div>

              <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">

                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">Category Name</div>
                <div className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider sm:flex-1">{name}</div>
                
            </div>

            
            
        </div>
    </main>
    
  )
}

export default ViewCategoryDetail