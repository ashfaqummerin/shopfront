import { createSlice } from "@reduxjs/toolkit"

export const getProductTopRated = createSlice({
    name: "productTopRated",
    initialState: {
        products: []
    },
    reducers: {
        PRODUCT_TOP_REQUEST: (state) => {
            state.loading = true
            state.products = []
        },
        PRODUCT_TOP_SUCCESS: (state, action) => {
            state.loading = false
            state.products = action.payload
        },
        PRODUCT_TOP_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL } = getProductTopRated.actions
export default getProductTopRated.reducer