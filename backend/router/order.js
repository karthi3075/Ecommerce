const express = require("express")
const mongoose = require("mongoose")
const Order = require("../models/order")
const router = express.Router()
const auth=require("../middleware/auth")
router.post("/add",auth, async (req, res) => {
    try {
        const mobile = req.user.mobile
        const { products, total } = req.body
        const orderProducts = products.map(product => ({
            product: new mongoose.Types.ObjectId(product.product),
            quantity: product.quantity,
            price: product.price
        }))
        const order = new Order({
            mobile,
            products: orderProducts,
            total
        })
        await order.save()
        res.status(201).json({
            status: true,
            message: "order stored"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

router.post("/view",auth, async (req, res) => {
    try {
        const mobile = req.user.mobile
        const orders = await Order.find({ mobile })
        res.status(200).json({
            status: true,
            message: "orders fetch success",
            orders: orders
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message
        })
    }
})


router.delete("/delete",auth, async (req, res) => {
    try {
        const { id } = req.body
        console.log(req.body)
        const response = await Order.findOneAndDelete({ _id: id })
        res.status(200).json({
            status: true,
            message: "order deleted"
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message
        })
    }
})

router.post("/details",auth, async (req, res) => {
    try {
        const { id } = req.body
        const order = await Order.findById(id).populate("products.product")
        console.log(order.products)
        res.status(200).json({
            status: true,
            message: "orders fetch success",
            order: order
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message
        })
    }
})

//for admin order page

router.get("/details",auth, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({
            status: true,
            message: "orders fetch success",
            orders: orders
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message
        })
    }
})


router.post("/change_status",auth, async (req, res) => {
    try {
        const { id, status } = req.body
        const change = await Order.findOneAndUpdate({ _id: id }, { $set: { status: status } })
        res.status(200).json({
            status: true,
            message: "status changed success",
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message
        })
    }
})
module.exports = router