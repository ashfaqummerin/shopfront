import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import userLoginReducer from "./userSlice"
import orderCreateReducer from "./orderCreateSlice"
import orderDetailReducer from "./orderDetailSlice"

const store = configureStore({
    reducer: combineReducers({
        productList: productReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailReducer
    }),

})

export default store