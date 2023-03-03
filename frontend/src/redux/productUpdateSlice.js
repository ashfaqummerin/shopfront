import { createSlice } from "@reduxjs/toolkit";

export const productUpdateSlice = createSlice({
    name: "producUpdate",
    initialState: {
        // product: {}
    },
    reducers: {
        PRODUCT_UPDATE_REQUEST: (state) => {
            state.loading = true
        },
        PRODUCT_UPDATE_SUCCESS: (state, action) => {
            state.loading = false
            state.success = true
            state.product = action.payload
        },
        PRODUCT_UPDATE_FAIL: (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload
        },
        PRODUCT_UPDATE_RESET: (state, action) => {
            state.product = {}
            state.loading = false
            state.success = false


        }
    }
})

export const { PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET } = productUpdateSlice.actions
export default productUpdateSlice.reducer