const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
            required: true
        },
        quantity: {
            required: true,
            type: Number,
            min: 1
        }
    }]
})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart