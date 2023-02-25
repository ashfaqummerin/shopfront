import { createSlice } from "@reduxjs/toolkit"

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        userInfo: userInfoFromStorage,
        user: {}
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
            state.userInfo = null
        },
        USER_REGISTER_REQUEST: (state) => {
            state.loading = true
        },
        USER_REGISTER_SUCCESS: (state, action) => {
            state.loading = false
            state.userInfo = action.payload
        },
        USER_REGISTER_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload.response.data.message
        },
        USER_DETAIL_REQUEST: (state, action) => {
            state = {
                ...state,
                loading: true,
                user: {}
            }
            // state.loading = true
        },
        USER_DETAIL_SUCCESS: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        USER_DETAIL_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload.response.data.message
        },
        USER_UPDATE_PROFILE_REQUEST: (state) => {
            state.loading = true
        },
        USER_UPDATE_PROFILE_SUCCESS: (state, action) => {
            state.loading = false
            state.success = true
            state.userInfo = action.payload
        },
        USER_UPDATE_PROFILE_FAIL: (state, action) => {
            state.loading = false
            state.error = action.payload.response.data.message
        }
    }
})

export default userLoginSlice.reducer
export const {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL
} = userLoginSlice.actions 