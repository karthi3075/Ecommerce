import React from 'react'
import { useEffect,useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import {toast} from "react-toastify"


const AdminOrders = () => {

    const [status,setStatus]=useState("")
     useEffect(() => {
            fetchOrderDetails()
        }, [])
    
        const [products,setProducts]=useState([])
        const fetchOrderDetails = async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/details`)
            setProducts(res.data.orders)
        }
    
    const changeStatus=async(event,id)=>{
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/order/change_status`,{id:id,status:event.target.value})
        if(res.data.status){
            fetchOrderDetails() 
            toast.success("status changed successfully")
        }else{
            toast.error("status does not changed")
        }
    }
  return (
    <div className='p-3 pt-20'>
        <h1 className='mb-4'>Orders</h1>
        <table className='border'>
            <thead>
                <tr className='hover:bg-gray-200'>
                    <th className='px-5 py-1 border-b'>S.No</th>
                    <th className='px-5 py-1 border-b'>Mobile Number</th>
                    <th className='px-5 py-1 border-b'>Number of product</th>
                    <th className='px-5 py-1 border-b'>Total</th>
                    <th className='px-5 py-1 border-b'>View Details</th>
                    <th className='px-5 py-1 border-b'>Status</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index)=>(
                    <tr className='hover:bg-gray-200' key={index}>
                        <td className='px-5 py-1 border-b'>{index+1}</td>
                        <td className='px-5 py-1 border-b'>{product.mobile}</td>
                        <td className='px-5 py-1 border-b'>{product.products.length}</td>
                        <td className='px-5 py-1 border-b'>{product.total}</td>
                        <td className='px-5 py-1 border-b'>
                            <Link to={`/admin/order_details/${product._id}`}  className="text-blue-600">view</Link>
                        </td>
                        <td className='px-5 py-1 border-b'>
                            <select name="status" className="px-2 py-1 outline rounded" onChange={(event)=>{changeStatus(event,product._id)}} value={product.status} id="">
                                <option value="pending">pending</option>
                                <option value="shipped">shipped</option>
                                <option value="deliverd">delivered</option>
                                <option value="canceled">canceled</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default AdminOrders