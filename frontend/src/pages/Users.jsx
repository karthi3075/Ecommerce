import React, { useEffect,useState } from 'react'
import axios from "axios"

const Users = () => {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers=async()=>{
        const users=await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/users`)
        console.log(users.data.users)
        setUsers(users.data.users)
    }
  return (
    <div className='p-3 pt-20'>
        <h1 className='mb-4'>Users</h1>
        <table className='border'>
            <thead>
                <tr className='hover:bg-gray-200'>
                    <th className='px-5 py-1 border-b'>S.No</th>
                    <th className='px-5 py-1 border-b'>Name</th>
                    <th className='px-5 py-1 border-b'>Mobile</th>
                    <th className='px-5 py-1 border-b'>Email</th>
                    <th className='px-5 py-1 border-b'>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>(
                    <tr className='hover:bg-gray-200' key={user._id}>
                        <td className='px-5 py-1 border-b'>{index+1}</td>
                        <td className='px-5 py-1 border-b'>{user.name}</td>
                        <td className='px-5 py-1 border-b'>{user.mobile}</td>
                        <td className='px-5 py-1 border-b'>{user.email}</td>
                        <td className='px-5 py-1 border-b'>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Users