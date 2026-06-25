import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {toast} from "react-toastify"
import Loading from "../components/Loading"

const ProductDetails = () => {
    const [product,setProduct]=useState({})
    const [loading,setLoading]=useState(false)
    const api=import.meta.env.VITE_BASE_URL
    useEffect(()=>{
        fetchDetails();
    },[])

    const {id}=useParams()
    const fetchDetails=async()=>{
        setLoading(true)
        const response=await axios.post(`${api}/product/find`,{id:id})
        setProduct(response.data.product)
        setLoading(false)
    }

    const addToCart=async(event,id)=>{
            event.preventDefault()
            setLoading(true)
            const res=await axios.post(`${api}/product/add_cart`,{id:id})
            if(res.data.status){
                toast.success("Added to Cart",{position:"bottom-right"})
                setLoading(false)
            }else{
                toast.error("Add to cart failed",{position:"bottom-right"})
            }
        }  
  return (
    <div>
        {loading && <Loading/>}
        {!loading &&
        <div className="grid grid-cols-3 mt-20 p-4 gap-3">
            <div>
                <img src={`${api}/uploads/${product.filename}`} alt="" width={400}/>
            </div>
            <div className="col-span-2">
                <h1>{product.productName}</h1>
                <h2>price: {product.price}</h2>
                <h2>category: {product.category}</h2>
                <p>{product.description}</p>
                <div className='flex gap-5 mt-5'>
                    {/* <button className='px-2 py-1 bg-green-400 rounded '>Order Now</button> */}
                    <button onClick={(event)=>{addToCart(event,product._id)}} className="px-2 py-1 bg-yellow-400 rounded cursor-pointer">Add to Cart</button>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default ProductDetails