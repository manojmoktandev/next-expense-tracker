import Link  from 'next/link';
import {  useState } from 'react';
import { MdOutlinePerson } from "react-icons/md";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
// import { UserProfile } from '@/interface/user-profile.interface';
import useAuth from '@/hooks/useAuth';
import { DateFormats, formatDate } from '@/utils/dateFormatter';
//import { formatCurrency } from '@/utils/currencyFormatter';



const Header= ()=>{
    const router  =  useRouter();
    const [toggleProfile,setToggleProfile] =  useState(false);
    const {user} =  useAuth()

    const onToggleProfile = ()=>{
        setToggleProfile(!toggleProfile)
    }

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        Cookies.remove('access_token');
        router.replace('/auth/login');
    }
    
    return(
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Daily Expenses</h1>
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-4">
                        <Link href={`/`} className="hover:text-blue-200 cursor-pointer">Dashboard</Link>
                        <Link href={`/report`} className="hover:text-blue-200 cursor-pointer">Reports</Link>
                        <Link href={`/categories`} className="hover:text-blue-200 cursor-pointer">Category</Link>
                        <Link href={`/expenses`} className="hover:text-blue-200 cursor-pointer">Expenses</Link>
                        
                    </nav>

                    {/* Profile Icon with Dropdown */}
                    <div className="relative">
                        <button id="profile-btn" className="focus:outline-none cursor-pointer" onClick={onToggleProfile}>
                            
                            <MdOutlinePerson className='text-white-500' size={27} />
                            
                        </button>
                        <div id="profile-dropdown" className={`${toggleProfile ? 'show' : 'hidden'} absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg p-4 z-10`}>
                            <div className="flex items-center space-x-4 mb-4">

                                <div>
                                    <h3 className="text-lg font-medium">{user?.fullname}</h3>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">Member Since:{ formatDate(user?.createdAt,DateFormats.MONTH_YEAR)} </p>
                            {/* <p className="text-sm text-gray-700 mb-4">Total Expenses: {user?.expense ? formatCurrency(user?.expense,'USD') : formatCurrency(0,'USD')}</p> */}
                            <button className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-2">Edit Profile</button>
                            <button className="w-full cursor-pointer bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button id="mobile-menu-btn" className="md:hidden focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className="hidden md:hidden bg-blue-600 text-white p-4">
                <a href="#" className="block py-2 hover:text-blue-200">Dashboard</a>
                <a href="#" className="block py-2 hover:text-blue-200">Reports</a>
                <a href="#" className="hover:text-blue-200">Expenses</a>

            </div>
        </header>
    )
}
export default Header