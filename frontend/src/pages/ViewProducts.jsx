import React, { useEffect,useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const ViewProducts = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        fetchProducts();
    },[])
    const navigate=useNavigate()
    const api=import.meta.env.VITE_BASE_URL

    const fetchProducts=async()=>{
        const products=await axios.get(`${api}/product/view_product`)
        if(products){
            setProducts(products.data.products)
        }else{
            console.log("products not fetched")
        }
    }

    const handleDelete=async(id)=>{
        const res=await axios.delete(`${api}/product/delete`,{data:{id:id}})
        console.log(res.data)
        if(res.data.status){
            fetchProducts()
            toast.success("product deleted")
        }else{
            toast.error("product not deleted")
        }
    }

    const handleEdit=(id)=>{
        navigate(`/admin/add_products/${id}`)
    }
  return (
    <div className='p-3 pt-20 h-screen overflow-y-auto'>
        <h1 className='mb-4'>Products</h1>
        <table className='border'>
            <thead>
                <tr className='hover:bg-gray-200'>
                    <th className='px-5 py-1 border-b'>S.No</th>
                    <th className='px-5 py-1 border-b'>Name</th>
                    <th className='px-5 py-1 border-b'>Category</th>
                    <th className='px-5 py-1 border-b'>Image</th>
                    <th className='px-5 py-1 border-b'>Price</th>
                    <th className='px-5 py-1 border-b'>Description</th>
                    <th className='px-5 py-1 border-b'>Edit</th>
                    <th className='px-5 py-1 border-b'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index)=>(
                    <tr className='hover:bg-gray-200' key={product._id}>
                        <td className='px-5 py-1 border-b'>{index+1}</td>
                        <td className='px-5 py-1 border-b'>{product.productName}</td>
                        <td className='px-5 py-1 border-b'>{product.category}</td>
                        <td className='px-5 py-1 border-b'><img src={`${api}/uploads/${product.filename}`} alt="" /></td>
                        <td className='px-5 py-1 border-b'>{product.price}</td>
                        <td className='px-5 py-1 border-b'>{product.description}</td>
                        <td className='px-5 py-1 border-b'><button onClick={()=>{handleEdit(product._id)}} className='px-2 py-1 text-white rounded bg-yellow-400 cursor-pointer'>Edit</button></td>
                        <td className='px-5 py-1 border-b'><button onClick={()=>{handleDelete(product._id)}} className='px-2 py-1 text-white rounded bg-red-700 cursor-pointer'>delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ViewProducts