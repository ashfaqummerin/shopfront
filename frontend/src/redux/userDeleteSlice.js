import { createSlice } from "@reduxjs/toolkit"

export const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState: {

    },
    reducers: {
        USER_DELETE_REQUEST: (state) => {
            state.loading = true
        },
        USER_DELETE_SUCCESS: (state) => {
            state.loading = false
            state.success = true
        },
        USER_DELETE_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } = userDeleteSlice.actions
export default userDeleteSlice.reducer