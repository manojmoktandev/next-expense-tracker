'use client'
import Header from "@/components/layout/header/header"
import Footer from "@/components/layout/footer/footer"
import { withAuth } from "@/components/auth/withAuth"

const Layout = ({children}:Readonly<{children:React.ReactNode}>)=>{
    return(
        <div className="min-h-screen flex flex-col">
            {/* {  Header } */}
            <Header/>

            {/* Main Content */}
            <main className="container mx-auto p-4 flex-grow">
                {children}
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    )
}
export default withAuth(Layout,['User'])
    
    
   

    