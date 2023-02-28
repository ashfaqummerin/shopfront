import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
    try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    } else {
        const order = new Order({ user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
        }
    } catch (error) {
        console.log("Order Error:", error)
        res.status(400)
        throw new Error(error.message)
    }
})

// @Desc Get order by id
// @route GET /api/orders/:id
// Access Private

const getOrderById = asyncHandler(async (req, res) => {
    try {

        const order = await Order.findById(req.params.id).populate({ path: "user", select: "name email" })
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
    } catch (error) {

        res.status(400)
        // throw new Error(error.message)
        throw error
    }

})

//@Desc Update order to paid
//@route GET /api/orders/:id/pay
//access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            // order.paymentResult = {
            //     id: req.body.id,
            //     status: req.body.status,
            //     update_time: req.body.update_time,
            //     email_address: req.body.payer.email_address
            // }
            order.details = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }
    } catch (error) {
        console.log("updatedOrderFail", error)
        res.status(400)
        throw error

    }
})

// @des Get logged in users order
// @route GET /api/orders/myorders
// @access private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }