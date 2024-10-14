import { useEffect, useState } from "react";
import { api } from "../../API/api";
import { useDispatch, useSelector } from "react-redux";
import { incrementSkip, likePost, setPosts } from "../../Store/Slices/postsSlice";
import placeholderAvatar from "../../assets/svgs/avatar.svg"
import like from "../../assets/svgs/heart.svg"
import share from "../../assets/svgs/share.svg"
import PostsFilterHeader from "../../Components/PostsFilterHeader";
// import upload from "../../assets/images/send_button.png"
import { selectSearchTerm } from "../../Store/Slices/searchSlice";
import AddPost from "../../Components/AddPost";


const Posts = () => {
    const dispatch = useDispatch();
    const skip = useSelector((state) => state.posts.skip);
    const postsList = useSelector((state) => state.posts.posts);
    const searchTerm = useSelector(selectSearchTerm);
    const [filter, setFilter] = useState('all');        

    useEffect (() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                let url;
                if (filter === 'liked') { url = "/social/posts/likes/" }
                else if (filter === 'friends') { url = "/social/posts/friends/" }
                else if (filter === 'follow') { url = "/social/posts/following/" }
                else { url = "/social/posts/" }

                const res = await api.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        skip,
                        limit: 50,
                    }
                });
                dispatch(setPosts(res.data.results));
            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, [filter, dispatch, skip])

    const filteredPosts = postsList.filter(
        (post) =>
            post.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
                }
            })

            const updatedPost = await api.get(`/social/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            console.log(updatedPost);
            dispatch(likePost(updatedPost.data));
        } catch (error) {
            console.log(error);
        }
    }
    const handleLoadMore = async () => {
            dispatch(incrementSkip());
            try {
                const token = localStorage.getItem("accessToken");
                let url;
                if (filter === 'liked') { url = "/social/posts/likes/" }
                else if (filter === 'friends') { url = "/social/posts/friends/" }
                else if (filter === 'follow') { url = "/social/posts/following/" }
                else { url = "/social/posts/" }

                const res = await api.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        skip,
                        limit: 50,
                    }
                });
                // Create a new state object with updated posts
                const newPosts = [...postsList, ...res.data.results];
                dispatch(setPosts(newPosts));
            }
            catch (error) {
            console.log(error);
            }
        };

    console.log(postsList);

        return (
            <div className="mx-auto px-16 max-w-screen box-border">
                <PostsFilterHeader setFilter={setFilter} />
                    <div className="grid grid-cols-2 gap-6 auto-rows-auto">
                    <AddPost />
                    {postsList.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
                                <div>
                                    <div className="text-lg font-semibold flex flex-row gap-3">
                                        <img 
                                            src={post.user.avatar || placeholderAvatar} 
                                            alt=""
                                            className="w-[50px] h-[50px]"
                                        />
                                        <span className="flex flex-col self-center">
                                            <div>
                                                {post.user.first_name} {post.user.last_name}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {formatDate(post.created)}
                                            </div>                                        
                                        </span>
                                        </div>
                                    <div className="text-gray-700 my-2">{post.content}</div>
                                    {post.images.length > 0 && (
                                        <img
                                            src={post.images[0].image}
                                            alt="Post Image"
                                            className="w-full h-auto object-cover rounded-lg"
                                        />
                                    )}
                                </div>
                                <div className="flex pt-8 items-center justify-between">
                                    <div className="flex gap-8">
                                        <button className="flex gap-2" onClick={() => handleLike(post.id)}><img src={like} alt="" />Like</button>
                                        <button className="flex gap-2"><img src={share} alt="" />Share</button>
                                    </div>
                                    <div className="mr-5 text-sm text-slate-500">
                                        {post.amount_of_likes} likes
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-2 text-center">No posts available</p>
                    )}
                </div>
                <div className="flex justify-center my-10">
                    <button className="mt-6 mb-6 px-6 py-2 bg-gradient-to-br from-fuchsia-700 to-indigo-500 text-white rounded-2xl" onClick={handleLoadMore}>Load More</button>
                </div>
            </div>
        );
}

export default Posts;