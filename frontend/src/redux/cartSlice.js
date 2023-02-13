import { createSlice } from "@reduxjs/toolkit"

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
// console.log("cartItems", cartItemsFromStorage, typeof cartItemsFromStorage)
export const cartSlice = createSlice({
    name: "cartItem",
    initialState: {
        cartItems: cartItemsFromStorage
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

        }
    },
})

export const { CART_ADD_ITEM, CART_REMOVE_ITEM } = cartSlice.actions
export default cartSlice.reducer