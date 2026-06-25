import { useForm } from "react-hook-form"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate=useNavigate()

    const handle_submit = async(data) => {
        try{
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`,data)
            if(response.data.status){
                navigate("/user/dashboard")
            }else{
                toast.error("invalid username or password")
            }
        }catch(error){
            if(error.response.status==429){
                toast.warning(error.response.data.message)
            }else{
                toast.error("invalid username or password")
            }
        }

    }
    return (
        <div className="h-screen flex justify-center items-center bg-gray-700 max-w-screen">
            <div className="p-5 bg-white rounded ">
                <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
                <form action="" onSubmit={handleSubmit(handle_submit)} className="flex  flex-col gap-2">
                    
                    <div className="flex flex-col">
                        <label htmlFor="" className="mb-1">Enter Mobile Number</label>
                        <input type="text"
                            {...register("mobile", {
                                required: "mobile number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit mobile number",
                                }
                            })}
                            className="px-2 py-1 w-75 md:w-100 outline-2 rounded outline-blue-400" />
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

                    <button type="submit" className="cursor-pointer mt-3 px-2 py-2 bg-blue-600 rounded-md w-full text-white">Login</button>

                </form>
                <div className="flex justify-end">
                    <Link to="/registration" className="mt-3 text-blue-700">Create an Account</Link>
                </div>
            </div>
        </div>
    )
}

//.env
//cors
//jwt - httpOnly cookie
//helmet
//express-rate-limit
//bcrypt