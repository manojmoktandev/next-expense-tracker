import CategoryForm from "@/components/category/form"
import { PageHeader } from "@/components/common/page.header"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"

const Page = ()=>{
    return(
        <div className="w-full h-full"> 
            <PageHeader title='Create Category' buttonText='Back To List' link='/categories' Icon={<MdOutlineKeyboardArrowLeft  size={26} className="w-4 h-4"/>} />
             <div>
                  <CategoryForm/>
            </div> 
        </div>
    )
}

export default Page