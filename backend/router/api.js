const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/registration")
const router = express.Router()
const rateLimit=require("express-rate-limit")
const jwt=require("jsonwebtoken")
const auth=require("../middleware/auth")

const loginLimit=rateLimit({
    windowMs:10*60*1000,
    max:5,
    message:{
        status:false,
        message:"Maximum attempts reached try after 10 minutes"
    }
})

router.post("/registration", async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body
        const hased_password = await bcrypt.hash(password, 10)
        const user = new User({ name, email, mobile, password: hased_password,role:"user" })
        await user.save()

         const token=jwt.sign(
            {id:user.id,role:user.role,mobile:user.mobile},
            process.env.jwt_secrete,
            {expiresIn:"1d"}
        )

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:24*60*60*1000
        })

        res.status(201).json({
            status: true,
            message: "user created"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

router.post("/login",loginLimit, async (req, res) => {
    try {
        const { mobile, password } = req.body
        const user = await User.findOne({ mobile: mobile })
        if (!user) {
            return res.status(404).json({
                status: false
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        console.log(isMatch)
        if (! isMatch) {
             return res.status(401).json({
                status: false,
                message: "invalid crediantials"
            })
        }

        const token=jwt.sign(
            {id:user.id,role:user.role,mobile:user.mobile},
            process.env.jwt_secrete,
            {expiresIn:"1d"}
        )

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:24*60*60*1000
        })

        return res.status(200).json({
            status:true,
            message:"login success",
            role:user.role
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error"
        })
    }
})

router.get("/me", auth, (req, res) => {
    return res.status(200).json({
        status: true,
        user: req.user
    })
})

router.post("/logout", auth, (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    return res.status(200).json({
        status: true,
        message: "logout success"
    })
})
module.exports = router