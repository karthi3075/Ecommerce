import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from 'axios'
import Loading from '../components/Loading'
import Empty from '../components/Empty'

const Products = () => {
    const [products, setProducts] = useState([])
    const [search,setSearch]=useState("")
    const [loading,setLoading]=useState(false)
    const api=import.meta.env.VITE_BASE_URL
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        const products = await axios.get(`${api}/product/view_product`)
        setLoading(false)
        setProducts(products.data.products)
    }

    const addToCart=async(event,id)=>{
        event.preventDefault()
        setLoading(true)
        const res=await axios.post(`${api}/product/add_cart`,{id:id})
        setLoading(false)
        console.log(res.data)
        if(res.data.status){
            toast.success("Added to Cart")
        }else{
            toast.error("Add to cart failed")
        }
    }  

    const handleSearch=async(event)=>{
        event.preventDefault()
        setLoading(true)
        const res=await axios.post(`${api}/product/search`,{search:search})
        setLoading(false)
        console.log(res.data)
        setProducts(res.data.products) 
    }

    return (
        <div >
            <div className='flex justify-center items-center pt-8 mt-15'>
                <form className='absolute  mb-4   ' onSubmit={handleSearch}>
                    <input type="text" onChange={()=>{setSearch(event.target.value)}} value={search} placeholder='search product' className='px-2 py-1 w-75 md:w-100 rounded outline-2 outline-blue-600' />
                    <button className='px-2 py-1 rounded-r bg-blue-600 absolute top-0 right-0 bottom-0' >Search</button>
                </form>
            </div>
            {loading && <Loading/>}
            {!loading && products.length<=0 && 
                <Empty msg="No products Found"/>
            }
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 p-4'>
                {!loading && products.map((product) => (
                    <div key={product._id} className='p-3 shadow '>
                        <Link  to={`/user/product_details/${product._id}`} >
                            <div className='flex justify-center h-48 overflow-hidden'>
                                <img src={`${api}/uploads/${product.filename}`} className='w-full h-full object-contain' alt="" />
                            </div>
                            <div>
                                <h3>{product.productName}</h3>
                                <h3>Price: {product.price}</h3>
                            </div>
                        </Link>
                        <div>
                            <button onClick={(event)=>{addToCart(event,product._id)}} className="px-2 py-1 bg-yellow-400 rounded w-full mt-2 cursor-pointer">Add to Cart</button>
                        </div>
                    </div>

                ))}
            </div>
        </div >
    )
}

export default Products