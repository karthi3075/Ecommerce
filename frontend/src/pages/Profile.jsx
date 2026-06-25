import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"

const Profile = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "karthi",
            mobile: "8765432109",
            email: "karthi@gmail.com"
        }
    })
    const [edit, setEdit] = useState(false)
    const [profileImg,setProfileImg]=useState("")

    useEffect(()=>{
        fetchDetails()
    },[])

    const fetchDetails=async()=>{
        const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`)
        console.log(res.data)
        if(res.data.user.profileImg){
            
            setProfileImg(res.data.user.profileImg)
            console.log(profileImg)
        }
        reset({
            profileImg:res.data.user.profileImg,
            name:res.data.user.name,
            email:res.data.user.email,
            mobile:res.data.user.mobile
        })
    }

    const onSubmit=async(data)=>{
        const formData=new FormData()

        if (data.profileImg && data.profileImg.length > 0) {
            formData.append("profileImg", data.profileImg[0])
        }

        formData.append("name", data.name)
        formData.append("mobile", data.mobile)
        formData.append("email", data.email)

        const res=await axios.patch(`${import.meta.env.VITE_BASE_URL}/profile/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        if(res.data.status){
            toast.success("profile updated")
            setEdit(false)
            fetchDetails()
        }else{
            toast.error("profile not updated")
        }
    }

    const onEditClick=(event)=>{
        event.preventDefault()
        setEdit(!edit)
    }
    return (
        <div className='mt-20 flex justify-center overflow-y-auto' style={{height:"520px"}}>
            <div className="bg-gray-200 shadow rounded p-3 w-100 mb-5">
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div>
                        <div className='flex justify-center items-center p-3'>
                            <img src={profileImg? `${import.meta.env.VITE_BASE_URL}/uploads/${profileImg}`: "/favicon.svg"} className='rounded-full p-5 bg-white h-50' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        {edit &&
                            <div>
                                <input type="file"
                                    {...register("profileImg")}
                                    className='px-2 py-1 outline-2 rounded outline-blue-500 w-full'
                                />
                                {errors.profileImg && <p className="text-sm mt-1 text-red-700">{errors.profileImg.message}</p>}
                            </div>
                        }
                        <div className='flex flex-col gap-1 mb-2'>
                            <label htmlFor="">Name</label>
                            <input type="text"
                                {...register("name", { required: "Name is required" })}
                                className='px-2 py-1 outline-2 rounded outline-blue-500'
                                readOnly={!edit}
                            />
                            {errors.name && <p className="text-sm mt-1 text-red-700">{errors.name.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1 mb-2'>
                            <label htmlFor="">Mobile</label>
                            <input type="text"
                                readOnly={true}
                                {...register("mobile", {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit mobile number",
                                    }
                                })}
                                className='px-2 py-1 outline-2 rounded outline-blue-500' />
                            {errors.mobile && <p className="text-sm mt-1 text-red-700">{errors.mobile.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1 mb-2'>
                            <label htmlFor="">Email</label>
                            <input type="text"
                                readOnly={!edit}
                                {...register("email", {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    }
                                })}
                                className='px-2 py-1 outline-2 rounded outline-blue-500'
                            />
                            {errors.email && <p className="text-sm mt-1 text-red-700">{errors.email.message}</p>}
                        </div>
                        <div>
                            {edit ?
                                <button type='submit'  className='px-2 py-1 rounded bg-green-600 text-white mt-4 w-full'>Update</button>
                                :
                                <button type='button' className='px-2 py-1 rounded bg-yellow-400 text-white mt-4 w-full' onClick={onEditClick}>Edit</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile