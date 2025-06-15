import { PageHeader } from '@/components/common/page.header'
import ExpenseList from '@/components/expense/list'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const page = () => {
  return (
       <main>
           <PageHeader title='Expenses List' buttonText='Add Expenses' link='/expenses/create' Icon={<IoMdAdd size={26} className="w-4 h-4"/>} />
           <ExpenseList />
       </main>
  )
}

export default page