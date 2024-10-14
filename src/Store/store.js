import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import postsSlice from "./Slices/postsSlice";
import searchSlice from "./Slices/searchSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        posts: postsSlice,
        search: searchSlice,
    }
}) 

export default store;