
'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import { useEffect } from "react";
import toast from "react-hot-toast";
import ParseToken from "@/utils/parse-token";


export function withAuth<T>(Component: React.ComponentType<T>,roles:string[]){
    return function WithAuthComponent(props:any){
        const router =  useRouter();
        useEffect(()=>{
            const token =  Cookies.get('access_token')
            const {valid,role} = ParseToken(token ?? '')
            if(!valid || !roles.includes(role ?? '')){
                console.log(valid,role);
                Cookies.remove('token')
                localStorage.removeItem('user')
                toast.error('Session expired. Try login again.')
                router.replace('/auth/login')
                return
            }
        },[router])
        return <Component {...props} />
    }
}
