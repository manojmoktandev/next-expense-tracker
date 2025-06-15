import React from 'react'

const Summarize = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-md text-center">
                    <h3 className="text-lg font-medium">Total Spent</h3>
                    <p className="text-2xl font-bold">$650.00</p>
                </div>
                <div className="bg-green-100 p-4 rounded-md text-center">
                    <h3 className="text-lg font-medium">Budget Left</h3>
                    <p className="text-2xl font-bold">$350.00</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-md text-center">
                    <h3 className="text-lg font-medium">Top Category</h3>
                    <p className="text-2xl font-bold">Food</p>
                </div>
            </div>
        </div>
    )
}

export default Summarize