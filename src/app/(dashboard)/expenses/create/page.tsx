import ExpenseForm from "@/components/expense/form"
import { PageHeader } from "@/components/common/page.header"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"

const Page = ()=>{
    return(
        <div className="w-full h-full"> 
            <PageHeader title='' buttonText='Back To List' link='/expenses' Icon={<MdOutlineKeyboardArrowLeft  size={26} className="w-4 h-4"/>} />
            <div>
                <ExpenseForm/>
            </div>
            
        </div>

    )
}

export  default Page