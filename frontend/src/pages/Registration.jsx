import { useForm } from "react-hook-form"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

export default function Registration() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const navigate=useNavigate()

    const handle_submit = async(data) => {
        try{
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/registration`,data)
            if(response.data.status){
                console.log("ok")
                navigate("/user/dashboard")
            }else{
                console.log("this mobile number is already used use different number")
                toast.warning("this mobile is already used")
            }
        }catch(error){
            console.log("this mobile number is already used")
            toast.warning("this mobile is already used use different number")
        }

    }
    return (
        <div className="h-screen flex justify-center items-center bg-gray-700 max-w-screen">
            <div className="p-5 bg-white rounded">
                <h1 className="text-center font-bold text-2xl mb-4">Registration</h1>
                <form action="" onSubmit={handleSubmit(handle_submit)} className="flex  flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="" className="mb-1">Enter Name</label>
                        <input type="text"
                            {...register("name", {
                                required: "Name is required"
                            })}
                            className="px-2 py-1 md:w-100 outline-2 rounded outline-blue-400"
                        />
                        {errors.name && <p className="text-sm mt-1 text-red-700">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="mb-1">Enter Email</label>
                        <input type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address",
                                }
                            })}
                            className="px-2 py-1 w-75 md:w-100 outline-2 rounded outline-blue-400" />
                        {errors.email && <p className="text-sm mt-1 text-red-700">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="mb-1">Enter Mobile Number</label>
                        <input type="number"
                            {...register("mobile", {
                                required: "mobile number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit mobile number",
                                }
                            })}
                            className="px-2 py-1 w-full outline-2 rounded outline-blue-400" />
                        {errors.mobile && <p className="text-sm mt-1 text-red-700">{errors.mobile.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="mb-1">Enter Password</label>
                        <input type="password"
                            {...register("password", {
                                required: "password is required",
                                minLength: {
                                    value: 8,
                                    message: "password must be at least 8 characters"
                                }
                            })}
                            className="px-2 py-1 w-full outline-2 rounded outline-blue-400" />
                        {errors.password && <p className="text-sm mt-1 text-red-700">{errors.password.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="mb-1">Confirm Password</label>
                        <input type="password"
                            {...register("confirm_password", {
                                required: "confirm password is required",
                                validate: (value) => value === getValues("password") || "password do not match"
                            })}
                            className="px-2 py-1 w-full outline-2 rounded outline-blue-400" />
                        {errors.confirm_password && <p className="text-sm mt-1 text-red-700">{errors.confirm_password.message}</p>}
                    </div>

                    <button type="submit" className="cursor-pointer mt-3 px-2 py-2 bg-blue-600 rounded-md w-full text-white">Register</button>

                </form>
                <div className="flex justify-end">
                    <Link to="/login" className="mt-3 text-blue-700">Have an Account.</Link>
                </div>
            </div>
        </div>
    )
}