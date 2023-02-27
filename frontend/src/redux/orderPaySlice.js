import { createSlice } from "@reduxjs/toolkit"

export const orderPaySlice = createSlice({
    name: "orderPay",
    initialState: {

    },
    reducers: {
        ORDER_PAY_REQUEST: (state) => {
            state.loading = true
        },
        ORDER_PAY_SUCCESS: (state) => {
            state.loading = false
            state.success = true
        },
        ORDER_PAY_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        ORDER_PAY_RESET: (state) => {
            state = {}
        }
    }
})

export const { ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET } = orderPaySlice.actions
export default orderPaySlice.reducer