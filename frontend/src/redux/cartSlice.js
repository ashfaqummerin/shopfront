import { createSlice } from "@reduxjs/toolkit"

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const shippingAddressFromStorage = localStorage.getItem("shipingAddress") ? JSON.parse(localStorage.getItem("shipingAddress")) : {}
// console.log("cartItems", cartItemsFromStorage, typeof cartItemsFromStorage)
export const cartSlice = createSlice({
    name: "cartItem",
    initialState: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    reducers: {
        CART_ADD_ITEM: (state, action) => {
            const newItem = action.payload
            const existItem = state.cartItems.find(x => x._id === newItem._id)

            if (existItem) {
                const cart = {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === existItem._id ? newItem : x)
                }

                localStorage.setItem("cartItems", JSON.stringify(cart.cartItems))
                return cart
            } else {
                const newCart = {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                }
                localStorage.setItem("cartItems", JSON.stringify(newCart.cartItems))
                return newCart
            }
        },
        CART_REMOVE_ITEM: (state, action) => {
            const newCart = {
                ...state,
                cartItems: state.cartItems.filter(x => x._id !== action.payload)
            }
            localStorage.setItem("cartItems", JSON.stringify(newCart.cartItems))
            return newCart

        },
        CART_SAVE_SHIPPING_ADDRESS: (state, action) => {
            const data = {
                ...state,
                shippingAddress: action.payload
            }
            localStorage.setItem("shipingAddress", JSON.stringify(data.shippingAddress))
            return data 
        },
        CART_SAVE_PAYMENT_METHOD: (state, action) => {
            const data = {
                ...state,
                paymentMethod: action.payload
            }
            localStorage.setItem("paymentMethod", JSON.stringify(data.paymentMethod))
            return data
        }
    },
})

export const { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } = cartSlice.actions
export default cartSlice.reducer