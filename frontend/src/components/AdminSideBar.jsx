import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div className='p-3 h-screen pt-20 flex justify-between flex-col bg-blue-400'>
        <div className='flex flex-col'>
            <Link to="/user/dashboard" className='border-b p-1 hover:bg-blue-500 rounded'>Home</Link>
            <Link to="/admin/users" className='border-b p-1 hover:bg-blue-500 rounded'>Users</Link>
            <Link to="/admin/orders"  className='border-b p-1 hover:bg-blue-500 rounded'>Orders</Link>
            <Link to="/admin/add_products"  className='border-b p-1 hover:bg-blue-500 rounded'>Add Products</Link>
            <Link to="/admin/view_products"  className='border-b p-1 hover:bg-blue-500 rounded'>View Products</Link>
        </div>
        <Link to="/logout" className='px-2 py-1 bg-red-700 text-center text-white rounded'>Logout</Link>
    </div>
  )
}

export default AdminSideBar