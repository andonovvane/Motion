import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name: "user",
    initialState: {
        accessToken: undefined,
        details: null,
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.accessToken = null
            state.details = null
        },
        loadUser: (state, action) => {
            state.details = action.payload
            localStorage.setItem("userDetails", JSON.stringify(action.payload))
        },
        updateUser: (state, action) => {
            state.details = {
                first_name: action.payload,
                last_name: action.payload,
            }
        },
    },
});

export const { login, logout, loadUser, updateUser } = userSlice.actions;
export default userSlice.reducer