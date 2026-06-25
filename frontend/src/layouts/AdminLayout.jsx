import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { Outlet } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const AdminLayout = () => {
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`)
          if (response.data.user.role !== 'admin') {
            navigate('/login')
            return
          }
          setLoading(false)
        } catch (error) {
          navigate('/login')
        }
      }
      checkAuth()
  }, [])

  if (loading) return null

  return (
    <div>
        <AdminHeader/>
        <div className="grid grid-cols-5">
            <AdminSideBar/>
            <div className="col-span-4 w-full">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout