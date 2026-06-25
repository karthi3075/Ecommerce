import React, { useEffect, useState } from 'react'
import {Outlet, useNavigate} from "react-router-dom"
import axios from 'axios'
import UserHeader from '../components/UserHeader'
const UserLayout = () => {
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
      const checkAuth = async () => {
        try {
          await axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`)
          setLoading(false)
        } catch (error) {
          navigate("/login")
        }
      }
      checkAuth()
    },[])
    if (loading) return null
  return (
    <div>
        <UserHeader/>
        <Outlet/>
    </div>
  )
}

export default UserLayout