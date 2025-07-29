import ViewExpenseDetail from "@/components/expense/view"
import { PageHeader } from "@/components/common/page.header"
import React from "react"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"

type Props = {
    params: Promise<{id:string}>
}

const Page = async(props:Props) => {
    const {id} = await props.params
    return (
        <main>
            <PageHeader title="Expense Detail" buttonText="Back Expense" link="/expenses" Icon={<MdOutlineKeyboardArrowLeft size={26} className="w-4 h-4" />} />
            <ViewExpenseDetail id={id} />
        </main>
    )
}
export default Page;