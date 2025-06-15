'use client'
import { IUser } from "@/interfaces/auth.interface";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IContext {
    user:IUser | null;
    updateUser:(x:IUser)=>void
}

const initialValues = {
    user:null,
    updateUser:(x:IUser)=>{}
}


export const AuthContext =  createContext<IContext>(initialValues)
// wrapp->appwrap

const AuthProvider = ({children}:Readonly<{children:ReactNode}>) =>{
    const [user,setUser]  =  useState<IUser | null>(null)
    const updateUser = (userData:IUser)=>{
        setUser(()=>userData)
    }
    useEffect(()=>{
        const localData =  localStorage.getItem('user');
        if(localData){
            setUser(JSON.parse(localData || '{}'))
        }
    },[])
    return(
        <AuthContext.Provider  value={{user,updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
