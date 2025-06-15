import React from 'react'

const CreateCategory = () => {
  return (
      <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="number" id="amount" placeholder="$0.00" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select id="category" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Entertainment</option>
                      <option>Other</option>
                  </select>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input type="text" id="description" placeholder="e.g., Lunch at Cafe" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Add Expense</button>
          </div>
      </div>
  )
}

export default CreateCategory