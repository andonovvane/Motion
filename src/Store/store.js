import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice"
import postsReducer from "./Slices/postsSlice"
import searchReducer from "./Slices/searchSlice"
export default configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
        search: searchReducer,
    },
})