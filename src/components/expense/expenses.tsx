import React from 'react'

const RecentExpenses = () => {
  return (
       <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2">Date</th>
                                        <th className="p-2">Amount</th>
                                        <th className="p-2">Category</th>
                                        <th className="p-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-2">2025-05-25</td>
                                        <td className="p-2">$15.00</td>
                                        <td className="p-2">Food</td>
                                        <td className="p-2">Lunch at Cafe</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-2">2025-05-24</td>
                                        <td className="p-2">$30.00</td>
                                        <td className="p-2">Transport</td>
                                        <td className="p-2">Taxi to Airport</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">2025-05-23</td>
                                        <td className="p-2">$20.00</td>
                                        <td className="p-2">Entertainment</td>
                                        <td className="p-2">Movie Tickets</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
  )
}

export default RecentExpenses