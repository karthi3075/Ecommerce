const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    mobile:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    status:{
        type:String,
        required:true,
        default:"pending"
    }
})

const Order=mongoose.model("Order",orderSchema)
module.exports=Order