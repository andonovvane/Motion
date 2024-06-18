import { useDispatch, useSelector } from "react-redux"
import { api } from "../../API/api"
import { useEffect, useState } from "react";
import { StyledBodyPostsRoute, StyledDivContainerPostsRoute, StyledDivPostsRoute,
        StyleduserPostDiv, StyledProfileAndUserPostDiv, StyledPPostsRoute, StyledlikeSharePostsRoute,
        } from "../../Styles/PostsRouteStyles/PostsStyles";
import { setPosts, likePost, incrementSkip } from "../../Store/Slices/postsSlice";
import AddPost from "./AddPost";

const Post = () => {
    const dispatch = useDispatch();
    const skip = useSelector((state) => state.posts.skip)
    const postsList = useSelector((state) => state.posts.posts);
    const [isLoading, setIsLoading] = useState(false);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    
    const placeholderAvatar = "src/Motion-assets/svgs/avatar.svg"

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("accessToken");
                const res = await api.get("/social/posts/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    skip,
                    limit: 50,
                },
                });
        
                dispatch(setPosts(res.data.results));
                console.log(res.data.results)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
    
            getPosts();
        }, [dispatch, skip]);

        const filteredPosts = postsList.filter(
            (post) =>
                post.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );


    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
        };

        const handleLike = async (postId) => {
            try {
                const token = localStorage.getItem("accessToken");
                await api.post(`/social/posts/toggle-like/${postId}/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        
            const updatedPost = await api.get(`/social/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        
                dispatch(likePost(updatedPost.data));
            } catch (error) {
                console.log("error", error);
            }
        };

        const handleLoadMore = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await api.get("/social/posts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    skip: skip,
                    limit: 50,
                },
            });
        
                dispatch(setPosts([...postsList, ...res.data.results]));
                incrementSkip((prevSkip) => prevSkip + 50);
            } catch (error) {
                console.log("Error loading more posts:", error);
            }
        };

    return (
        <>
            <StyledBodyPostsRoute>
                {isLoading ? (
                <p>Loading...</p>
                ) : (
                <StyledDivContainerPostsRoute>
                    <AddPost />
                    {filteredPosts.map((post, index) => (
                    <StyledDivPostsRoute key={`${post.id}-${index}`}>
                        <StyleduserPostDiv>
                        <StyledProfileAndUserPostDiv>
                            <img
                            src={post.user.avatar || placeholderAvatar}
                            alt="User Avatar"
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                            }}
                            />
                            <span>
                            <div>
                                {post.user.first_name} {post.user.last_name}
                            </div>
                            <div>{formatDate(post.created)}</div>
                            </span>
                        </StyledProfileAndUserPostDiv>
                        {/* <MenuIcon></MenuIcon> */}
                        </StyleduserPostDiv>
        
                        <StyledPPostsRoute>{post.content}</StyledPPostsRoute>
                        {post.images.length > 0 && (
                        <img
                            src={post.images[0].image}
                            alt={`Post Image`}
                            style={{ width: "80%", height: "auto" }}
                        />
                        )}
                        <StyledlikeSharePostsRoute>
                        <div>
                            <button onClick={() => handleLike(post.id)}>
                            {" "}
                            <img src="src/Motion-assets/svgs/heart.svg" alt="" />
                            like
                            </button>
                            <button>
                            {" "}
                            <img src="src/Motion-assets/svgs/share.svg" alt="" />
                            share
                            </button>
                        </div>
                        <p>{post.amount_of_likes} likes</p>
                        </StyledlikeSharePostsRoute>
                    </StyledDivPostsRoute>
                    ))}
                    {filteredPosts.length > 0 && (
                    <button onClick={handleLoadMore}>Load More</button>
                    )}
                </StyledDivContainerPostsRoute>
                )}
            </StyledBodyPostsRoute>
            </>
        );
    };

export default Post