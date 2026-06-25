const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const connectDB=require("./db")
const router=require("./router/api")
const admin=require("./router/admin")
const order=require("./router/order")
const path=require("path")
const product=require("./router/product")
const profile=require("./router/profile")
const helmet=require("helmet")
const cookieParser=require("cookie-parser")
dotenv.config()
connectDB();

const app=express()

app.use(helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
}))
app.use(cors({
    origin:process.env.frontend_url,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",router)
app.use("/admin",admin)
app.use("/product",product)
app.use("/order",order)
app.use("/profile",profile)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(3000,()=>{
    console.log("server running")
})