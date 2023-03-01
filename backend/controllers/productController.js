import asyncHandler from "express-async-handler"
import Product from "../models/productsModel.js"

// @desc Fetch all products
// @route GET /api/products
// @acess public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// // @route GET /api/products/:id
// // @acess public

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product Not Found")
    }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json("Product removed")
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

export { getProductById, getProducts, deleteProduct }