import { createSlice } from "@reduxjs/toolkit"

export const orderCreateSlice = createSlice({
    name: "orderCreate",
    initialState: {
        // order: {},
        // loading: true,
        // orderItems: [],
        // shippingAddress: {}
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
        },
        // ORDER_DETAIL_REQUEST: (state) => {
        //     state = {
        //         ...state,
        //         loading: true
        //     }
        // },
        // ORDER_DETAIL_SUCCESS: (state, action) => {
        //     state.loading = true
        //     state.order = action.payload
        // },
        // ORDER_DETAIL_FAIL: (state, action) => {
        //     state.error = action.payload
        // }
    }
})

export const {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    // ORDER_DETAIL_REQUEST,
    // ORDER_DETAIL_SUCCESS,
    // ORDER_DETAIL_FAIL
} = orderCreateSlice.actions

export default orderCreateSlice.reducer