import { createSlice } from "@reduxjs/toolkit";

export const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState: {

    },
    reducers: {
        PRODUCT_DELETE_REQUEST: (state) => {
            state.loading = true
        },
        PRODUCT_DELETE_SUCCESS: (state) => {
            state.loading = false
            state.success = true
        },
        PRODUCT_DELETE_FAIL: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
        PRODUCT_DELETE_RESET: (state, action) => {
            state.loading = false
            state.success = false
            // state = {}

        }
    }
})

export const { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET } = productDeleteSlice.actions
export default productDeleteSlice.reducer