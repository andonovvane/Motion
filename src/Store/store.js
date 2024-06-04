import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice"
import postsReducer from "./Slices/postsSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
    },
})