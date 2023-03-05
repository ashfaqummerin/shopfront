import { createSlice } from "@reduxjs/toolkit"

export const productReviewCreateSlice = createSlice({
    name: "productReviewCreate",
    initialState: {

    },
    reducers: {
        PRODUCT_CREATE_REVIEW_REQUEST: (state) => {
            state.loading = true
        },
        PRODUCT_CREATE_REVIEW_SUCCESS: (state) => {
            state.loading = false
            state.success = true
        },
        PRODUCT_CREATE_REVIEW_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        PRODUCT_CREATE_REVIEW_RESET: (state) => {
            state.loading = false
            state.success = false
        }
    }
})

export const { PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } = productReviewCreateSlice.actions
export default productReviewCreateSlice.reducer