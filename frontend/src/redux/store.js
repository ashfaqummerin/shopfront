import { configureStore, combineReducers } from "@reduxjs/toolkit"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import userLoginReducer from "./userSlice"
import orderCreateReducer from "./orderCreateSlice"
import orderDetailReducer from "./orderDetailSlice"
import orderPayReducer from "./orderPaySlice"
import orderListMyReducer from "./orderListMySlice"
import userListReducer from "./userListSlice"
import userDeleteReducer from "./userDeleteSlice"
import userUpdateReducer from "./userUpdateSlice"
import productDeleteReducer from "./productDeleteSlice"

const store = configureStore({
    reducer: combineReducers({
        productList: productReducer,
        productDelete: productDeleteReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailReducer,
        orderPay: orderPayReducer,
        orderListMy: orderListMyReducer,

    }),

})

export default store