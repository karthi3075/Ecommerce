import React from 'react'
import {useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import axios from "axios"

const AdminHeader = () => {
  const [profileImg,setProfileImg]=useState("")
  
    useEffect(()=>{
      fetchProfile()
    },[])
    const fetchProfile=async()=>{
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`)
      if(res.data.status){
        setProfileImg(res.data.user.profileImg)
      }
    }
  return (
    <div className='p-3 bg-blue-600 text-white flex justify-between fixed top-0 left-0 right-0'>
      <h1>E-commerce</h1>
      <Link to="/admin/profile">
        <div className='w-8 h-8 flex justify-center items-center'>
          <img src={profileImg ? `${import.meta.env.VITE_BASE_URL}/uploads/${profileImg}` : "/favicon.svg"} className=' rounded-full' />
        </div>
      </Link>
    </div>
  )
}

export default AdminHeader