'use client'
import { IRegister } from '@/interfaces/auth.interface';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LuAsterisk } from "react-icons/lu";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from '@/schema/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { register  as registerUser } from '@/api/auth.api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUpForm = () => {
    const router =  useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<IRegister>({
        defaultValues: {
            fullname: '',username:'', email: '', password: '', confirmPassword: '', phone: ''
        },
        resolver: yupResolver(RegisterSchema)
    })
    
    const {reset,isPending,mutate} =  useMutation({
        mutationFn:registerUser,
        onSuccess:(response)=>{
            toast.success(response.mesage??'User Registered Succesfully')
            router.replace('/auth/login')
            reset()
        },
        onError:(error)=>{
            toast.error(error.message ?? 'User Failed to Registered')
        }
        
    })

    const registerFormSubmit = (data:IRegister) => {
        const {confirmPassword,...others}  = data;
        mutate(others)
    }
    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center tracking-wider'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'> Register </h1>
                </div>
            
                <form className='space-y-6' onSubmit={handleSubmit(registerFormSubmit)}>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Full Name <LuAsterisk className='text-xxs text-red-500' /></label>
                        <input type='text'{...register('fullname')} id="fullname" placeholder='Enter your Full Name' className={`w-full px-4 py-2 border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border ${errors.fullname ? "border-red-500 focus:outline-red-500" : "focus:outline-blue-400"}`}></input>
                        {errors?.fullname && <p className='text-sm text-red-500'>{errors?.fullname.message}</p>}
                    </div>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Username <LuAsterisk className='text-xxs text-red-500' /></label>
                        <input type='text'{...register('username')} id="username" placeholder='Enter your Full Name' className={`w-full px-4 py-2 border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border ${errors?.username ? "border-red-500 focus:outline-red-500" : "focus:outline-blue-400"}`}></input>
                        {errors?.username && <p className='text-sm text-red-500'>{errors?.username.message}</p>}
                    </div>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Email <LuAsterisk className='text-xxs text-red-500' /></label>
                        <input type='text' {...register('email')} id="email" placeholder='Enter your email' className={`w-full px-4 py-2 border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border ${errors?.email ? "border-red-500 focus:outline-red-500" : "focus:outline-blue-400"}`}></input>
                        {errors?.email && <p className='text-sm text-red-500'>{errors?.email.message}</p>}
                    </div>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Password<LuAsterisk className='text-xxs text-red-500' /></label>
                        <input type='password'{...register('password')} id="password" placeholder='Enter your password' className={`w-full px-4 py-2 border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border ${errors?.password ? "border-red-500 focus:outline-red-500" : "focus:outline-blue-400"}`}></input>
                        {errors?.password && <p className='text-sm text-red-500'>{errors?.password.message}</p>}
                    </div>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Confirm Password<LuAsterisk className='text-xxs text-red-500' /></label>
                        <input type='password' {...register('confirmPassword')} id="confirm-password" placeholder='Enter your confirm password' className={`w-full px-4 py-2 border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border ${errors?.password ? "border-red-500 focus:outline-red-500" : "focus:outline-blue-400"}`}></input>
                        {errors?.confirmPassword && <p className='text-sm text-red-500'>{errors?.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Phone <LuAsterisk className='text-xxs text-red-500' /></label>
                        <input type='text' id="phone" {...register('phone')} placeholder='+1 xxx-xxxx' className={`w-full px-4 py-2 border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border ${errors?.phone ? "border-red-500 focus:outline-red-500" : "focus:outline-blue-400"}`}></input>
                        {errors?.phone && <p className='text-sm text-red-500'>{errors?.phone.message}</p>}
                    </div>

                    <button type='submit' disabled={isPending} className='cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 w-full bg-blue-500 text-white py-2  px-4 rounded-lg hover:bg-blue-600 transition-colors'>
                        {isPending ? 'Signing in ': 'Sign up'}
                    </button>
                </form>

                <div className='text-center text-sm text-gray-500'>Already have an account ?
                <Link href={"/auth/login"}> <span className='text-blue-500 hover:text-blue-600 text-sm'>Sign In</span></Link>
                </div>
            </div>
        </div>

    )
}

export default SignUpForm