import React from 'react'
import Registration from './pages/Registration'
import Login from "./pages/Login"
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import UserLayout from './layouts/UserLayout'
import Products from "./pages/Products"
import AdminLayout from './layouts/AdminLayout'
import Users from './pages/Users'
import AdminRegistration from './pages/AdminRegistration'
import Logout from './components/Logout'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddProducts from './pages/AddProducts'
import ViewProducts from './pages/ViewProducts'
import OrderPage from './pages/OrderPage'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import AdminOrders from './pages/AdminOrders'
import axios from "axios"
import Profile from './pages/Profile'

axios.defaults.withCredentials=true
const App = () => {
    return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/user" element={<UserLayout/>}>
                <Route path="dashboard" element={<Products/>} />
                <Route path='product_details/:id' element={<ProductDetails/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path="order_page" element={<OrderPage/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="order_details/:id" element={<OrderDetails/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
            <Route path="/admin_registration" element={<AdminRegistration/>}/>
            <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<Users/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='add_products' element={<AddProducts/>}/>
                <Route path='add_products/:id' element={<AddProducts/>}/>
                <Route path='view_products' element={<ViewProducts/>}/>
                <Route path="orders" element={<AdminOrders/>}/>
                <Route path="order_details/:id" element={<OrderDetails/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    <ToastContainer position='top-center' autoClose={3000} pauseOnHover closeOnClick/>
    </>
  )
}

export default App