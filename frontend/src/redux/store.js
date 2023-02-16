import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import userLoginReducer from "./userLoginSlice"

const store = configureStore({
    reducer: combineReducers({
        productList: productReducer,
        cart: cartReducer,
        userLogin: userLoginReducer
    }),

})

export default store