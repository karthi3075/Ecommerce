import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {useEffect,useState} from "react"

const AddProducts = () => {
    const { register, handleSubmit,reset,formState:{ errors } } = useForm()
    const [edit,setEdit]=useState(false)
    const [image,setImage]=useState("")
    const navigate=useNavigate()
    const {id}=useParams()

    const fetchProduct=async()=>{
                const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/product/find`,{id:id})
                console.log(res.data)
                setImage(res.data.product.filename)
                reset({
                    productName:res.data.product.productName,
                    category:res.data.product.category,
                    price:res.data.product.price,
                    description:res.data.product.description
                })
            }

    useEffect(()=>{
        if(id){
            setEdit(true)
            
           fetchProduct()
        }
    },[])
    const handle_submit = async(data) => {
        console.log(data)
        const formData=new FormData()
        formData.append("productName",data.productName)
        formData.append("price",data.price)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("image",data.file[0])
        const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/product/add_product`,formData)
        console.log(response.data)
        if(response.data.status){
            console.log("ok")
            reset()
            toast.success("product added",{
                position:"bottom-right"
            })
        }else{
            console.log("not ok")
            toast.error("product not added",{
                position:"bottom-right"
            })
        }
    }

    const handleEdit=async(data)=>{
        console.log(data)
        const formData=new FormData()
        formData.append("id",id)
        formData.append("productName",data.productName)
        formData.append("price",data.price)
        formData.append("category",data.category)
        formData.append("description",data.description)
        if(data.file[0]){
            formData.append("image",data.file[0])
        }
        const response= await axios.patch(`${import.meta.env.VITE_BASE_URL}/product/edit_product`,formData)
        console.log(response.data)
        if(response.data.status){
            navigate("/admin/view_products")
            toast.success("product updated")
        }else{
            console.log("not ok")
            toast.error("product not updated",{
                position:"bottom-right"
            })
        }
    }
    return (
        <div className='mt-20 p-3 flex justify-center items-center flex-col'>
            <h1 className='mb-5'>Add Product</h1>
            <form className='shadow p-3 rounded-md'>
                <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">Enter Name</label>
                    <input type="text"
                        {...register("productName", {
                            required: "Name is required"
                        })}
                        className="px-2 py-1 mb-2 md:w-100 outline-2 rounded outline-blue-400"
                    />
                    {errors.productName && <p className="text-sm mt-1 text-red-700">{errors.productName.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">Enter Category</label>
                    <input type="text"
                        {...register("category", {
                            required: "price is required"
                        })}
                        className="px-2 py-1 mb-2 md:w-100 outline-2 rounded outline-blue-400"
                    />
                    {errors.price && <p className="text-sm mt-1 text-red-700">{errors.price.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">Enter Price</label>
                    <input type="number"
                        {...register("price", {
                            required: "price is required"
                        })}
                        className="px-2 py-1 mb-2 md:w-100 outline-2 rounded outline-blue-400"
                    />
                    {errors.price && <p className="text-sm mt-1 text-red-700">{errors.price.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">Enter Description</label>
                    <textarea type="number"
                        {...register("description", {
                            required: "description is required"
                        })}
                        className="px-2 py-1 mb-2 md:w-100 outline-2 rounded outline-blue-400"
                    />
                    {errors.description && <p className="text-sm mt-1 text-red-700">{errors.description.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">Upload image</label>
                    {edit?
                         <input type="file"
                        {...register("file")}
                        className="px-2 py-1 mb-2 md:w-100 outline-2 rounded outline-blue-400"
                    />
                    :
                     <input type="file"
                        {...register("file", {
                            required: "image is required"
                        })}
                        className="px-2 py-1 mb-2 md:w-100 outline-2 rounded outline-blue-400"
                    />
                    }
                   
                    {errors.file && <p className="text-sm mt-1 text-red-700">{errors.file.message}</p>}
                </div>
                {edit?
                    <button className='px-2 py-1 bg-green-600 rounded text-white mt-4 w-full'  onClick={handleSubmit(handleEdit)}>Edit</button>
                :
                    <button className='px-2 py-1 bg-green-600 rounded text-white mt-4 w-full'  onClick={handleSubmit(handle_submit)}>Submit</button>
                }
            </form>
        </div>
    )
}

export default AddProducts