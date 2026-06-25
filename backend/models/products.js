const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        required:true,
        type:Number
    },
    category:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },  
    filename:{
        required:true,
        type:String
    }
})
const Product=mongoose.model("Product",productSchema)
module.exports=Product