import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserHeader = () => {
  const [userRole, setUserRole] = useState(null)
  const [profileImg,setProfileImg]=useState("")

  useEffect(()=>{
    fetchProfile()
  },[userRole])
  const fetchProfile=async()=>{
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`)
    if(res.data.status){
      setProfileImg(res.data.user.profileImg)
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`)
        setUserRole(response.data.user.role)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className='bg-blue-700 flex justify-between p-3 fixed top-0 right-0 left-0'>
        <h1 className='text-white font-bold text'>E-commerce</h1>
        <div className=''>
            <div className='flex gap-3 text-white items-center'>
              <Link to="/user/profile">
              <div className='w-8 h-8 flex justify-center items-center'>
                  <img src={profileImg? `${import.meta.env.VITE_BASE_URL}/uploads/${profileImg}`: "/favicon.svg"} className=' rounded-full' />
                </div></Link>
              <Link to="/user/dashboard">Home</Link>
              <Link to="/user/cart">Cart</Link>
              <Link to="/user/orders">orders</Link>
              <Link to="/logout" className='px-2 py-1 bg-red-700 text-white rounded'>Logout</Link>
              {userRole === "admin" &&
                  <Link to="/admin" className='px-2 py-1 bg-green-700 text-white rounded'>Dashboard</Link>
              }
            </div>
        </div>
    </div>
  )
}

export default UserHeader