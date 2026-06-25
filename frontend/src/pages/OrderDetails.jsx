import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom"
import {toast} from "react-toastify"
import {useLocation} from "react-router-dom"

const OrderDetails = () => {
    
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState("")
    const api=import.meta.env.VITE_BASE_URL
    const location=useLocation()
    useEffect(() => {
        fetchOrderDetails()
    }, [])

    useEffect(() => {
        fetchStatus()
    }, [products])
    const { id } = useParams()
    console.log(id)
    const fetchOrderDetails = async () => {
        const res = await axios.post(`${api}/order/details`, { id })
        setProducts(res.data.order.products)
    }
    const fetchStatus = async () => {
        const res = await axios.post(`${api}/order/details`, { id })
        setStatus(res.data.order.status)
    }

    const changeStatus = async (event, id) => {
        const res = await axios.post(`${api}/order/change_status`, { id: id, status: event.target.value })
        if (res.data.status) {
            fetchOrderDetails()
            toast.success("status changed successfully")
        } else {
            toast.error("status does not changed")
        }
    }

    return (
        <div className='mt-15 p-3'>
            <div className='grid grid-cols-10'>
                <div className='col-span-2'></div>
                <div className='col-span-6'>
                    {/* <p className='text-end'>Total: Rs.{products.total}</p> */}
                    {products.map((product) => (
                        <div key={product.product._id} className='grid grid-cols-4 gap-2 mb-4 p-3 rounded shadow'>
                            <div>
                                <img src={`${api}/uploads/${product.product.filename}`} alt="" />
                            </div>
                            <div className="col-span-3 text-sm">
                                <Link to={`${api}/user/product_details/${product.product._id}`}>{product.product.productName}</Link>
                                <h4>Price: Rs.{product.product.price}</h4>
                                <div className='flex justify-between'>
                                    <div className="flex justify-between w-full">
                                        <h2>quantity: {product.quantity}</h2>
                                        <p>Total: Rs.{product.quantity * product.product.price}</p>

                                    </div>
                                    {/* <h4>Rs.{product.product.price * quantity[product._id]}</h4> */}
                                </div>
                            </div>
                        </div>
                    ))}
                    {location.pathname.includes("/admin/order_details") &&
                        <div className='flex justify-end'>
                            <select name="status" className="px-2 py-1 outline rounded" onChange={(event) => { changeStatus(event, id) }} value={status} id="">
                                <option value="pending">pending</option>
                                <option value="shipped">shipped</option>
                                <option value="deliverd">delivered</option>
                                <option value="canceled">canceled</option>
                            </select>
                        </div>
                    }
                </div>
                <div className='col-span-2'></div>
            </div>
        </div>
    )
}

export default OrderDetails