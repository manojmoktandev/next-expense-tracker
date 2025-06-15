import { AuthContext } from "@/context/auth.context"
import { useContext } from "react"

const useAuth = ()=>{
    return useContext(AuthContext)
}

export default useAuth