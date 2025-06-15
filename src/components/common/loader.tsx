import React from 'react'

const Loader = () => {
   return(
         <div id="loading" className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-600 border-solid"></div>
        </div>
    )
}

export default Loader