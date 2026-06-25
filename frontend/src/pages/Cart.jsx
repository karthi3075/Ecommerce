import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import Empty from '../components/Empty';
import Loading from '../components/Loading';

const Cart = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const api=import.meta.env.VITE_BASE_URL
    useEffect(() => {
        fetchCartDetails();
    },[])

    const fetchCartDetails = async () => {
        setLoading(true)
        const response = await axios.post(`${api}/product/view_cart`)
        setLoading(false)
        setProducts(response.data.products)
        console.log(response.data.products)
    }

    const removeFromCart=async(event,id)=>{
        console.log(id)
        event.preventDefault()
        setLoading(true)
        const response=await axios.delete(`${api}/product/delete_cart`,{data:{id:id}})
        console.log(response.data)
        if(response.data.status) {
            toast.success("product removed form cart")
            fetchCartDetails()
            setLoading(false)
        }else{
            toast.error("product not removed from cart")
        }
    }
    return (
        <div className=' mt-15'>
            {products.length>0 && 
                <div className='flex justify-end gap-4 me-5 mt-6 items-center'>
                    <Link to="/user/order_page" className='px-2 py-1 bg-green-500 rounded text-white'>Order now</Link>
                </div>
            }
            {loading && <Loading/>}
            {!loading && products.length<=0 && 
                <Empty msg="Cart is Empty" />
            }
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 p-4'>
                {!loading && products.map((product) => (
                    <div key={product.product._id} className='p-3 shadow '>
                        <Link to={`/user/product_details/${product.product._id}`} >
                            <div className='flex justify-center h-48 overflow-hidden'>
                                <img src={`${api}/uploads/${product.product.filename}`} className='w-full h-full object-contain' alt="" />
                            </div>
                            <div>
                                <h3>{product.product.productName}</h3>
                                <h3>Price: {product.product.price}</h3>
                                <h3>Quantity:{product.quantity}</h3>
                            </div>
                        </Link> 
                        <div>
                            <button onClick={(event)=>{removeFromCart(event,product._id)}} className="px-2 py-1 bg-red-700 text-white rounded w-full mt-2 cursor-pointer z-10 relative">Remove from Cart</button>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Cart