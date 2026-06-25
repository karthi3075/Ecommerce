const express=require("express")
const auth=require("../middleware/auth")
const User = require("../models/registration")
const upload=require("../middleware/upload")
const router=express.Router()

router.get("/view",auth,async(req,res)=>{
    const mobile=req.user.mobile
    try{
        const user=await User.findOne({mobile}).select("-password")
        res.status(200).json({
            status:true,
            user:user
        })
    }catch(error){
        res.status(404).json({
            status:false,
            message:"user not found"
        })
    }
})


router.patch("/update", auth, upload.single("profileImg"), async (req, res) => {
    const { name, email, mobile } = req.body
    const id = req.user.id

    try {
        const updateData = {
            name,
            email,
            mobile
        }

        if (req.file) {
            updateData.profileImg = req.file.filename
        }

        await User.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: true }
        )

        res.status(200).json({
            status: true,
            message: "updated"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "not updated"
        })
    }
})
module.exports=router