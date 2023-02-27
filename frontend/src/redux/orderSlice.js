import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
    name: "order",
    initialState: {

    },
    reducers: {
        ORDER_CREATE_REQUEST: (state) => {
            state.loading = true
        },
        ORDER_CREATE_SUCCESS: (state, action) => {
            state.loading = false
            state.success = true
            state.order = action.payload
        },
        ORDER_CREATE_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } = orderSlice.actions
export default orderSlice.reducer