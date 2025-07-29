'use client'
import { getExpenseById } from '@/api/expenses.api';
import { useQuery } from '@tanstack/react-query';
import React,{useState} from 'react'
import Loader from '../common/loader';
import { formatCurrency } from '@/utils/currencyFormatter';
import { formatDate } from '@/utils/dateFormatter';
import Image from 'next/image';


type Props = {
    id:string
}

const ViewExpenseDetail = (props:Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [largeImageUrl, setLargeImageUrl] = useState('');
    const {id} = props;

    const handleImageClick = (path:string) => {
        setIsModalOpen(true);
        setLargeImageUrl(path);
        console.log(largeImageUrl,path)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setLargeImageUrl('');
    }
    const {data, isLoading,error} = useQuery({
        queryFn:()=>getExpenseById(id),
        queryKey:['get-expense-by-id',id]
    })
  
    if(isLoading){
        return(<Loader/>)
    }
    if (error) console.log('Error:', error);
  
   const {title,description,amount,category,createdBy,receipts,createdAt,updatedAt} = data?.data;
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-black-200">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Title</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">{title}</div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Description</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">{description}</div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Amount</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">{formatCurrency(amount)}</div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Category</div>
                <div className="px-6 py-3 text-left font-medium tracking-wider sm:flex-1 text-xl ">{category?.name}</div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Created By</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">{createdBy?.fullname}</div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Receipts</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">
                    {
                        receipts && receipts.length > 0 ?
                        receipts?.map((receipt:{path:string,public_id:string}) =>(
                            <div key={receipt.public_id} className='h-[200px] w-[200px] aspect-square'>
                                <Image onClick={()=>handleImageClick(receipt.path)}
                                src={receipt.path}
                                alt={'receipts'}
                                height={400}
                                width={400}
                                className='h-full w-full object-cover cursor-pointer'
                                />
                               
                            </div>
                        ))

                        :'No receipts'
                    }
                </div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">Created At</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">{formatDate(createdAt)}</div>
            </div>
            <div className="bg-gray-50 flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200 border-b-1 border-gray-400">
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">UpdateAt</div>
                <div className="px-6 py-3 text-left text-xs font-medium tracking-wider sm:flex-1">{formatDate(updatedAt)}</div>
            </div>
           
        </div>

        {isModalOpen && (
        <div className='fixed top-0 left-0 w-3/4 h-3/4 opacity-100 bg-black flex justify-center items-center z-50'
          onClick={handleCloseModal}
        >
          <div className='relative w-full h-full'>
            <Image
              src={largeImageUrl}
              alt="receipts"
              fill // Makes the image fill the container
              className='object-contain'
            />
            <button onClick={handleCloseModal} className='absolute top-0 right-0 bg-white text-red-500 p-0 rounded-md w-10 h-10 text-xl font-bold'>
              X
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default ViewExpenseDetail