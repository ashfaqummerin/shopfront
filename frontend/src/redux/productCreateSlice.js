import { createSlice } from "@reduxjs/toolkit";

export const productCreateSlice = createSlice({
    name: "productDelete",
    initialState: {

    },
    reducers: {
        PRODUCT_CREATE_REQUEST: (state) => {
            state.loading = true
        },
        PRODUCT_CREATE_SUCCESS: (state, action) => {
            state.loading = false
            state.success = true
            state.product = action.payload

        },
        PRODUCT_CREATE_FAIL: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
        PRODUCT_CREATE_RESET: (state) => {
            state.loading = false
            state.success = false
            state.product = {} 
            // state = {}
        }
    }
})

export const { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } = productCreateSlice.actions
export default productCreateSlice.reducer