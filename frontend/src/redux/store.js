import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./productSlice"

const store = configureStore({
    reducer: {
        productList: productReducer
    }
})

export default store