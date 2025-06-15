'use client'
import { ILogin } from '@/interfaces/auth.interface';
import React from 'react'
import { useForm } from 'react-hook-form';
import { LuAsterisk } from "react-icons/lu";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from '@/schema/auth.schema';
import { login } from '@/api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

const LoginForm = () => {
    const router =  useRouter()
    const {updateUser} =  useAuth()
    const {reset,register,handleSubmit,formState:{errors}} =  useForm<ILogin>({
        defaultValues:{
            email:'',
            password:''
        },
        resolver:yupResolver(LoginSchema),
        mode:'onBlur'
    })

    const  {isPending,mutate}  = useMutation({
        mutationFn:login,
        onSuccess:(response)=>{
            console.log('on- sucess',response)
            toast.success(response.message ?? 'Login Success!!')
            localStorage.setItem('user',JSON.stringify(response.data));
            updateUser(response.data);
            if(response.token){
                Cookies.set('access_token',response.token)
            }
            router.replace('/');
            reset();
        },
        onError:(error)=>{
            toast.error(error.message ?? 'Login Failed')
        }
    })
    const submitForm = (data:ILogin)=>{
      //  const response =  await login(data);
        mutate(data)
    }
    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center tracking-wider'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'> Login Page</h1>
                </div>      

                <form className='space-y-6' onSubmit={handleSubmit(submitForm)}>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Email <LuAsterisk  className='text-xxs text-red-500'/></label>
                        <input type='text' id="email" {...register('email')}  placeholder='Enter your email' className='w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border'></input>
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className='flex text-sm font-medium text-gray-700 mb-1'> Password<LuAsterisk  className='text-xxs text-red-500'/></label>
                        <input type='password' id="password" {...register('password')} placeholder='Enter your password' className='w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-sm text-lg border'></input>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input type='checkbox' id="remember" className='h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded'></input>
                            <label className='ml-2 text-sm text-gray-600'> Remember Me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot password?</a>
                    </div>

                    <button type='submit' disabled={isPending} className='cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 w-full bg-blue-500 text-white py-2  px-4 rounded-lg hover:bg-blue-600 transition-colors'>
                        Sign In
                    </button>
                </form>
                <div className='text-center text-sm text-gray-500'>Don&apos;t have an account ?
                    <Link href={"/auth/signup"}> <span  className='text-blue-500 hover:text-blue-600 text-sm'>Sign Up</span></Link>
                </div>
            </div>
        </div>


         
    )
}

export default LoginForm