
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react"
import { UseFormRegister } from "react-hook-form";
import { LuAsterisk } from "react-icons/lu";

interface IProps {
    label:string;
    name:string;
    register:UseFormRegister<any>;
    error?:string;
    required?:boolean;
    placeholder?:string;
    multiline?:boolean;
    type?:'text' | 'date' | 'number';

}

export const Input:FC<IProps> = ({label,error,register,required,name,placeholder,multiline,type='text'})=>{
    return(
          <div className='flex flex-col gap-1'>
               <div className='flex '>
               <label className=' text-lg  '>{label}</label>
               {required  &&<LuAsterisk size={18} className='text-red-500'/>}
               </div>
                {!multiline ? <input  
                    {...register(name)} 
                    type = {type}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    error
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                    }`} 
                        
                /> :
                <textarea  
                    {...register(name)} 
                    placeholder={placeholder}
                     className='min-h-[120px] border border-gray-400 rounded-md py-2 px-3 focus:outline-blue-400'   
                />}
                {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
            </div>
    )


}