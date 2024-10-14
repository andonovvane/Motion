import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: true,
    skip: 0
};


const postsSlice = createSlice ({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        likePost: (state, action) => {
            const updatedPost = action.payload;
            const index = state.posts.findIndex((post) => post.id === updatedPost.id);

            if (index != -1) {
                state.posts[index] = updatedPost;
            }
        },
        incrementSkip: (state) => {
            state.skip += 50;
        }
    }
})

export const { setPosts, addPost, likePost, incrementSkip } = postsSlice.actions;
export default postsSlice.reducer;