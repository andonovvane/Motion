import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: undefined,
        details: null
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.details = action.payload.details;
        },
        logout: (state) => {
            state.accessToken = null;
            state.details = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const selectDetails = (state) => state.user.details;
export const accessToken = (state) => state.user.accessToken;

export default userSlice.reducer;