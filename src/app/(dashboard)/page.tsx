
import RecentExpenses from '@/components/expense/expenses'
import Summarize from '@/components/summarize/summarize'

import React from 'react'

const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Expenses */}
        <RecentExpenses/>
        
        {/* Summary Section */}
        <Summarize/>
    </div>
  )
}

export default DashboardHome