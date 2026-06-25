import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    const logout = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/logout`)
      } catch (error) {
        console.error(error)
      }
      navigate("/login")
    }
    logout()
  },[])
  return null
}

export default Logout