const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const upload = require("../middleware/upload")
const Product = require("../models/products")
const Cart = require("../models/cart")
const Order = require("../models/order")
const fs = require("fs")
const path = require("path")
const auth = require("../middleware/auth")
router.post("/add_product", auth, upload.single("image"), async (req, res) => {
    try {
        const { productName, price, description,category } = req.body
        console.log(productName)
        const product = new Product({
            productName: productName,
            price: price,
            description: description,
            category:category,
            filename: req.file.filename
        })
        await product.save()
        res.status(201).json({
            status: true,
            message: "product created"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "server failed"
        })
    }
})

router.get("/view_product", auth, async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            products: products
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
})

router.post("/find", auth, async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findOne({ _id: id })
        res.status(200).json({
            product: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }

})

router.delete("/delete", auth, async (req, res) => {
    try {
        const { id } = req.body
        const mobile = req.user.mobile
        console.log(id)

        const product = await Product.findOne({ _id: id })
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "product not found"
            })
        }

        const filePath = path.join(__dirname, "../uploads", product.filename)
        if (product.filename && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            console.log("File deleted:", filePath)
        }

        const [deleteProductResponse, cartUpdateResponse, orderUpdateResponse] = await Promise.all([
            Product.deleteOne({ _id: id }),
            Cart.updateMany({ "products.product": id }, {
                $pull: {
                    products: {
                        product: id
                    }
                }
            }),
            Order.updateMany({ "products.product": id }, {
                $pull: {
                    products: {
                        product: id
                    }
                }
            })
        ])

        await Order.deleteMany({ products: { $exists: true, $size: 0 } })

        if (deleteProductResponse.deletedCount > 0) {
            return res.status(200).json({
                status: true,
                message: "product deleted and removed from carts/orders"
            })
        }

        return res.status(404).json({
            status: false,
            message: "product not deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
})

router.patch("/edit_product", auth, upload.single("image"), async (req, res) => {
    const { id, productName, price, description,category } = req.body
    try {
        const response = await Product.findOne({ _id: id }).select("filename")
        const filename = response.filename

        const updateData = {
            productName,
            price,
            description,
            category
        }
        if (req.file) {
            const filePath = path.join(__dirname, "../uploads", filename)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
            updateData.filename = req.file.filename
        }

        const edit = await Product.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
        if (edit) {
            res.status(200).json({
                status: true,
                message: "product edited"
            })
        } else {
            res.status(404).json({
                status: false,
                message: "product not edited"
            })
        }

    } catch (error) {
        res.status(404).json({
            status: false,
            message: "not updated"
        })
    }
})

router.post("/add_cart", auth, async (req, res) => {
    try {
        const mobile = req.user.mobile
        const { id } = req.body
        const product = await Cart.countDocuments({ mobile: mobile })
        if (product == 0) {
            const cart = new Cart({
                mobile: mobile,
                products: [{
                    product: id,
                    quantity: 1
                }]
            })
            await cart.save()
            return res.status(201).json({
                status: true,
                message: "added to cart"
            })
        } else {
            const cart = await Cart.findOne({ mobile: mobile, "products.product": id })
            if (!cart) {
                await Cart.updateOne({ mobile: mobile }, {
                    $push: {
                        products: {
                            product: id,
                            quantity: 1
                        }
                    }
                })
            } else {
                await Cart.updateOne({ mobile: mobile, "products.product": id }, {
                    $inc: {
                        "products.$.quantity": 1
                    }
                })
            }
            res.status(201).json({
                status: true,
                message: "added to cart"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
})

router.post("/view_cart", auth, async (req, res) => {
    try {
        const mobile = req.user.mobile
        const cart = await Cart.findOne({ mobile }).populate("products.product")
        res.status(200).json({
            status: true,
            products: cart?.products || []
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
})

router.delete("/delete_cart", auth, async (req, res) => {
    try {
        const mobile = req.user.mobile
        const { id } = req.body
        await Cart.findOneAndUpdate({ mobile }, {
            $pull: {
                products: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            }
        }, { new: true })
        res.status(200).json({
            status: true,
            message: "item removed"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
})

router.post("/search", auth, async (req, res) => {
    try {
        const { search } = req.body
        const products = await Product.find({ productName: { $regex: search } })
        res.status(200).json({
            products: products,
            status: true
        })

    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: false
        })
    }
})

module.exports = router