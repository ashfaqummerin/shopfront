import { createSlice } from "@reduxjs/toolkit"

export const orderDeliverSlice = createSlice({
    name: "orderDeliver",
    initialState: {

    },
    reducers: {
        ORDER_DELIVER_REQUEST: (state) => {
            state.loading = true
        },
        ORDER_DELIVER_SUCCESS: (state) => {
            state.loading = false
            state.success = true
        },
        ORDER_DELIVER_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        ORDER_DELIVER_RESET: (state) => {
            // state.loading = false
            // state.success = false
            state = {}
        }
    }
})

export const { ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET } = orderDeliverSlice.actions
export default orderDeliverSlice.reducer