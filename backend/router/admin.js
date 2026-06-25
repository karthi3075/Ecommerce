const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User = require("../models/registration")
const router=express.Router()
const auth=require("../middleware/auth")
router.post("/registration", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body
        const hased_password = await bcrypt.hash(password, 10)
        const user = new User({ name, email, mobile, password: hased_password,role:"admin" })
        await user.save()
        const token = jwt.sign(
            {id:user.id,role:user.role,mobile:user.mobile},
            process.env.jwt_secrete,
            {expiresIn:"1d"}
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
        })
        res.status(201).json({
            status: true,
            message: "admin created"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

router.get("/users",auth,async(req,res)=>{
    try{
        const users=await User.find()
        res.status(200).json({
            users:users
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:false
        })
    }
})


module.exports=router