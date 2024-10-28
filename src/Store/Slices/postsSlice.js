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

//like post can be changed istead of replacing the whole post with updated post i just can icrease the likes by 1 so i would need to make an api call for the updated post two times (first adding like, second reading the updated post)