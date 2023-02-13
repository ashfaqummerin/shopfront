import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"

const store = configureStore({
    reducer: combineReducers({
        productList: productReducer,
        cart: cartReducer
    }),

})

export default store