'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

interface IProps{
    data:any[],
    columns:any[]
}

const  Table:React.FC<IProps> = ({data=[],columns})=> {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-2 overflow-x-auto">
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {data.length<1 && <tfoot>
                    <tr  className="hover:bg-gray-50">
                        <td colSpan={columns.length} className="px-6 py-4 text-center whitespace-nowrap text-right text-sm font-medium">  No Records Found
                        </td>
                    </tr>
                    </tfoot>
                }
            </table>
        </div>
        )
}
export default Table;
