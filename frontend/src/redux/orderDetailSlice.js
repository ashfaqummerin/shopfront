import { createSlice } from "@reduxjs/toolkit";

export const orderDetailSlice = createSlice({
    name: "orderDetail",
    initialState: {
        loading: true,
        orderItems: [],
        shippingAddress: {}
    },
    reducers: {
        ORDER_DETAIL_REQUEST: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        ORDER_DETAIL_SUCCESS: (state, action) => {
            state.loading = false
            state.order = action.payload
        },
        ORDER_DETAIL_FAIL: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL } = orderDetailSlice.actions
export default orderDetailSlice.reducer