import { createSlice } from "@reduxjs/toolkit"

export const userListSlice = createSlice({
    name: "userList",
    initialState: {
        users: []
    },
    reducers: {
        USER_LIST_REQUEST: (state) => {
            state.loading = true
        },
        USER_LIST_SUCCESS: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        USER_LIST_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL } = userListSlice.actions
export default userListSlice.reducer