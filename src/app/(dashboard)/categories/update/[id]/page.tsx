import UpdateCategory from '@/components/category/update-form'
import { PageHeader } from '@/components/common/page.header'
import { Metadata } from 'next'
import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

type Props = {
    params:Promise<{id:string}>
}

export const metadata :Metadata = {
    title : 'Expense Tracker | Upadate Category',
    description : 'Expense Tracker Description'
}

const page = async(props:Props) => {
    const {id}  = await props.params
  return (
    <div className="w-full h-full"> 
        <PageHeader title='Update Category' buttonText='Back To List' link='/categories' Icon={< MdOutlineKeyboardArrowLeft  size={26} className="w-4 h-4"/>} />
        <div>
            <UpdateCategory id={id} />
        </div>
    </div>
  )
}

export default page