import { PageHeader } from "@/components/common/page.header";
import UpdateExpenseForm from "@/components/expense/update-form";
import { Metadata } from "next";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

type Props = {
    params:Promise<{id:string}>
}
export const metadata :Metadata = {
    title : 'Expense Tracker | Upadate Expense',
    description : 'Expense Tracker Description'
}

const UpdateExpensePage = async(props:Props) => {
    const {id} = await props.params;

    return(
        <div className="w-full h-full">
            <PageHeader title='Update Expense' buttonText='Back To List' link='/expenses' Icon={< MdOutlineKeyboardArrowLeft  size={26} className="w-4 h-4"/>} />
            <div>
                <UpdateExpenseForm id={id} />
            </div>
        </div>
    )
}

export default UpdateExpensePage;