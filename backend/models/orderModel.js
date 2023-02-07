import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, reqired: true },
            price: { type: String, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                reqired: true,
                ref: "Product"
            }
        }
    ],
    shippingAddress: {
        adress: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    taxPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, {
    timeStamps: true
})

const Order = mongoose.model("Order", orderSchema)

export default Order