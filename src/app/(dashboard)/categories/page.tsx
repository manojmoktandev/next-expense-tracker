import CategoryList from '@/components/category/list'
import { PageHeader } from '@/components/common/page.header'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const page = () => {
  return (
    <main>
        <PageHeader title='Category List' buttonText='Add Category' link='/categories/create' Icon={<IoMdAdd size={26} className="w-4 h-4"/>} />
        <CategoryList />
    </main>
    

  )
}

export default page