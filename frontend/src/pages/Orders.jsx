import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Empty from "../components/Empty"
import Loading from "../components/Loading"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/order/view`)
        setLoading(false)
        setOrders(res.data.orders)
        console.log(res.data.orders)
    }

    const cancelOrder = async (id) => {
        setLoading(true)
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/order/delete`, { data: { id } })
        if (res.data.status) {
            fetchOrders()
            setLoading(false)
            toast.success("order deleted")
        } else {
            toast.error("order not deleted")
        }
    }
    return (
        <div className='mt-15 p-3'>
            {loading && <Loading />}
            {!loading && orders.length <= 0 &&
                <Empty msg="No Orders Found" />
            }
            <div className="grid grid-cols-10">
                <div className='col-span-2'></div>
                <div className='col-span-6'>
                    {!loading && orders.map((order) => (
                        <div key={order._id} className='p-3 m-3 shadow'>
                            <Link to={`/user/order_details/${order._id}`}>{order.products.length} products ordered</Link>
                            <p>total amount: Rs.{order.total}</p>
                            <div className='flex justify-between items-center'>
                                <p>Status: {order.status}</p>
                                <button className='px-2 py-1 bg-red-600 text-white rounded cursor-pointer' onClick={() => { cancelOrder(order._id) }}>Cancel</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-span-2'></div>
            </div>
        </div>
    )
}

export default Orders