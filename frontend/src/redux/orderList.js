import { createSlice } from "@reduxjs/toolkit"

export const orderListSlice = createSlice({
    name: "orderList",
    initialState: {
        orders: []
    },
    reducers: {
        ORDER_LIST_REQUEST: (state) => {
            state.loading = true
        },
        ORDER_LIST_SUCCESS: (state, action) => {
            state.loading = false
            state.orders = action.payload
        },
        ORDER_LIST_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } = orderListSlice.actions
export default orderListSlice.reducer