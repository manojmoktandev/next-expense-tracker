'use client'
import { useQuery } from "@tanstack/react-query";
import { getExpenseById } from "@/api/expenses.api";
import Loader from "../common/loader";
import ExpenseForm from "./form";


interface IProps {
    id:string
}

const UpdateExpenseForm:React.FC<IProps> = ({id}) => {
    const {data,isLoading} = useQuery({
        queryFn:()=>getExpenseById(id),
        queryKey:['get-expense-by-id']
    })
    if(isLoading){
        <Loader/>
    }
    return (
        <ExpenseForm expense={data?.data} />

    )
}

export default UpdateExpenseForm;