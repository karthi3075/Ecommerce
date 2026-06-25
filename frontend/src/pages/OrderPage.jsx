    import React, { useEffect, useState } from 'react'
    import axios from "axios"
    import {toast} from "react-toastify"
    const OrderPage = () => {
        const [products, setProducts] = useState([])
        const [quantity, setQuantity] = useState({})
        const [total,setTotal]=useState(0)
        const api=import.meta.env.VITE_BASE_URL
        useEffect(() => {
            fetchCartDetails()
        }, [])

        useEffect(() => {
            findQuantity()
        }, [products])

        useEffect(() => {
            calculateTotal()
        }, [quantity])

        const fetchCartDetails = async () => {
            const response = await axios.post(`${api}/product/view_cart`)
            setProducts(response.data.products)

        }

        const findQuantity = () => {
            const productQuantity = Object.fromEntries(
                products.map(product => [product._id, product.quantity]
                ))
            setQuantity(productQuantity)
        }
        const handleDecrease = (event, id) => {
            event.preventDefault()
            setQuantity(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }))
        }

        const handleIncrement = (id) => {
            setQuantity(prev => ({ ...prev, [id]: Math.max(1, prev[id] + 1) }))
        }

        const calculateTotal=()=>{
            const totalAmount = products.reduce((total, product) => {
                const qty = quantity[product._id] ?? product.quantity
                return total + (product.product.price * qty)
            }, 0)
            setTotal(totalAmount)
        }

        const addToOrder=async ()=>{
            const orderProducts=products.map((product)=>({
                product:product.product._id,
                price:product.product.price,
                quantity:quantity[product._id]

            }))
            const data={
                products:orderProducts,
                total:total
            }

            const response=await axios.post(`${api}/order/add`,data)
            if(response.data.status){
                toast.success("Products ordered Successfully")
            }else{
                toast.error("Products not ordered")
            }
        }
        return (
            <div className='mt-15 p-3'>
                <div className='grid grid-cols-10'>
                    <div className='col-span-2'></div>
                    <div className='col-span-6'>
                        <p className='text-end'>Total: Rs.{total}</p>
                        {products.map((product) => (
                            <div key={product._id} className='grid grid-cols-4 gap-2 mb-4 p-3 rounded shadow'>
                                <div>
                                    <img src={`${api}/uploads/${product.product.filename}`} alt="" />
                                </div>
                                <div className="col-span-3">
                                    <h2>{product.product.productName}</h2>
                                    <h4>Rs.{product.product.price}</h4>
                                    <div className='flex justify-between'>
                                        <div className="flex gap-2">
                                            <h2>quantity</h2>
                                            <div className=''>
                                                <button className='px-2 text-white bg-red-600 rounded-l' onClick={(event) => { handleDecrease(event, product._id) }}>-</button>
                                                <input type="number" readOnly value={quantity[product._id]} className='w-15 px-2 outline outline-blue-500' />
                                                <button className='px-2 text-white bg-green-600 rounded-r' onClick={() => { handleIncrement(product._id) }}>+</button>
                                            </div>
                                        </div>
                                        <h4>Rs.{product.product.price * quantity[product._id]}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <p className=''>Total: Rs.{total}</p>
                            <button className='px-2 py-1 cursor-pointer text-white rounded bg-green-700' onClick={addToOrder}>Order Now</button>
                        </div>
                    </div>
                    <div className='col-span-2'></div>
                </div>
            </div>
        )
    }

    export default OrderPage