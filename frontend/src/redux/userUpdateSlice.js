import { createSlice } from "@reduxjs/toolkit"

export const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState: {
        user: {}
    },
    reducers: {
        USER_UPDATE_REQUEST: (state) => {
            state.loading = true
        },
        USER_UPDATE_SUCCESS: (state) => {
            state.loading = false
            state.success = true
        },
        USER_UPDATE_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        USER_UPDATE_RESET: (state) => {
            { state.user = {} }
        }
    }
})

export const { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET } = userUpdateSlice.actions
export default userUpdateSlice.reducer