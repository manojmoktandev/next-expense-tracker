import Link from "next/link";
import { FC, ReactNode } from "react";

interface IProps {
    title:string;
    buttonText:string;
    link:string;
    Icon?:ReactNode

}

export const PageHeader:FC<IProps> = ({title,buttonText,link,Icon})=>{
    return(

    <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-gray-900 truncate sm:text-3xl">
          {title}
        </h1>
      </div>

      
      <Link href={link} passHref>
        <div className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-600 rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span>{buttonText}</span>
          {Icon && Icon }
        </div>
      </Link>
    </header>
    )
}



