import { createSlice } from "@reduxjs/toolkit"

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        userInfo: userInfoFromStorage
    },
    reducers: {
        USER_LOGIN_REQUEST: (state) => {
            state.loading = true
        },
        USER_LOGIN_SUCESS: (state, action) => {
            state.loading = false
            state.userInfo = action.payload
        },
        USER_LOGIN_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload.response.data.message
        },
        USER_LOGOUT: (state) => {
            state.user = {}
        }
    }
})

export default userLoginSlice.reducer
export const { USER_LOGIN_REQUEST, USER_LOGIN_SUCESS, USER_LOGIN_FAIL, USER_LOGOUT } = userLoginSlice.actions