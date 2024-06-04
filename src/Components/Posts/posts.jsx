import { useDispatch, useSelector } from "react-redux"
import { api } from "../../API/api"
import { setPosts } from "../../Store/Slices/postsSlice"
import { useEffect } from "react";
import { StyledBodyPostsRoute, StyledDivContainerPostsRoute, StyledDivPostsRoute, StyledIconNameWrapper, StyledPostsWrapper } from "../../Styles/PostsRouteStyles/PostsStyles";

const Post = () => {
    const dispatch = useDispatch();
    const skip = useSelector((state) => state.posts.skip)
    const postsList = useSelector((state) => state.posts.posts);
    
    const placeHolderAvatar = "src/Motion-assets/svgs/avatar.svg"

    useEffect(() => {
        getPosts();
    },[])

    const getPosts = async() => {
        try {
            const token = localStorage.getItem("accessToken")
            const res =  await api.get("/social/posts/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    skip,
                    limit: 50,
                },
            });

            dispatch(setPosts(res.data.results));
            console.log(res.data.results);
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <StyledBodyPostsRoute>
            <StyledDivContainerPostsRoute>
                <StyledPostsWrapper>
                    {postsList.map((post) => (
                        <StyledDivPostsRoute key={post.id}>
                            <StyledIconNameWrapper>
                            <img src={post.user.avatar || placeHolderAvatar} alt="" />
                                <h3>{post.user.first_name}</h3>
                                <h3>{post.user.last_name}</h3>
                            <div>
                                {post.created}
                            </div>
                            </StyledIconNameWrapper>
                            <div>{post.content}</div>
                            {post.images.length > 0 && (
                                <img src={post.images[0].image} alt="" />
                            )}
                        </StyledDivPostsRoute>
                    ))}
                </StyledPostsWrapper>
            </StyledDivContainerPostsRoute>
        </StyledBodyPostsRoute>
    )
}

export default Post