import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: []
    },
    reducers: {
        PRODUCT_LIST_REQUEST: (state) => {
            state.loading = true
            state.products = []
        },
        PRODUCT_LIST_SUCCESS: (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.pages = action.payload.pages
            state.page = action.payload.page
        },
        PRODUCT_LIST_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        PRODUCT_DETAIL_REQUEST: (state) => {
            state.loading = true
            state.product = []
        },
        PRODUCT_DETAIL_SUCCESS: (state, action) => {
            state.loading = false
            state.product = action.payload
        },
        PRODUCT_DETAIL_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload.response.data.message
        }

    }
})

export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } = productSlice.actions
export default productSlice.reducer