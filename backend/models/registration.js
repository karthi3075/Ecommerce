const mongoose=require("mongoose")
const registrationSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    mobile:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        required:true,
        type:String
    },
    profileImg:{
        type:String
    }
})
const User=mongoose.model("User",registrationSchema);
module.exports=User