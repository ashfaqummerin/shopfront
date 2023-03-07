import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./productSlice"
import { productDetailReducer } from "./productSlice"
import cartReducer from "./cartSlice"
import userLoginReducer from "./userSlice"
import { userDetailReducer } from "./userSlice"
import orderCreateReducer from "./orderCreateSlice"
import orderDetailReducer from "./orderDetailSlice"
import orderPayReducer from "./orderPaySlice"
import orderListMyReducer from "./orderListMySlice"
import userListReducer from "./userListSlice"
import userDeleteReducer from "./userDeleteSlice"
import userUpdateReducer from "./userUpdateSlice"
import productDeleteReducer from "./productDeleteSlice"
import productCreateReducer from "./productCreateSlice"
import productUpdateReducer from "./productUpdateSlice"
import orderListReducer from "./orderList"
import orderDeliverReducer from "./orderDeliverSlice"
import productReviewCreateReducer from "./productReviewSlice"
import productTopRatedReducer from './productTopSlice'

const store = configureStore({
    reducer: combineReducers({
        productList: productReducer,
        productDetails: productDetailReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,
        productTopRated: productTopRatedReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userDetails: userDetailReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailReducer,
        orderPay: orderPayReducer,
        orderDeliver: orderDeliverReducer,
        orderListMy: orderListMyReducer,
        orderList: orderListReducer
    }),

})

export default store