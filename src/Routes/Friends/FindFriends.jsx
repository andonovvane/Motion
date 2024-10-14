import { useEffect, useState } from "react";
import { api } from "../../API/api";
import userAvatar from "../../assets/svgs/avatar.svg";
import { useSelector } from "react-redux";
import { selectDetails } from "../../Store/Slices/userSlice";

const FindFriends = () => {
    const [usersList, setUsersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [limit] = useState(15);  // limit stays fixed
    const [offset, setOffset] = useState(0);  // offset is stateful
    const [loading, setLoading] = useState(false); // loading state for button feedback
    const userDetails = useSelector(selectDetails);
    
    // Initial load on component mount
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("accessToken");
                const res = await api.get(`/users/?limit=${limit}&offset=${offset}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsersList((prevUsers) => [...prevUsers, ...res.data.results]); // Append new users
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        const getFollowing = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await api.get("/social/followers/following", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setFollowingList(res.data.results);
            } catch (error) {
                console.log(error);
            }
        }

        const getFriends = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await api.get("/social/friends/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setFriendsList(res.data.results);
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();
        getFollowing();
        getFriends();
    }, [offset, limit]);

    // Load more users by increasing the offset
    const handleLoadMore = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const toggleFollow = async(user_id) => {
        try {
            const token = localStorage.getItem("accessToken");
            await api.post(`/social/followers/toggle-follow/${user_id}/`, userDetails, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Update followingList state after toggling follow
            setFollowingList((prevFollowing) => {
                const isFollowing = prevFollowing.some(user => user.id === user_id);
                
                if (isFollowing) {
                    // If currently following, remove the user from the list
                    return prevFollowing.filter(user => user.id !== user_id);
                } else {
                    // If not following, add the user to the list
                    return [...prevFollowing, { id: user_id }];
                }
            });

            console.log('user id: ', user_id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mx-auto px-16 max-w-screen box-border">
            <div className="grid grid-cols-3 gap-6 auto-rows-auto mt-6">
                {usersList.length > 0 ? (
                    <>
                        {usersList.map((user) => {
                            // Check if the user is in the followingList
                            const isFollowing = followingList.some(followingUser => followingUser.id === user.id);
                            const isFriends = friendsList.some(addedUser => addedUser.id === user.id)
                            return (
                                <div
                                    key={user.id}
                                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center gap-1"
                                >
                                    <div>
                                        <img
                                            src={user.avatar || userAvatar}
                                            alt="user avatar"
                                            className="w-[50px] h-[50px] rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xl">{user.first_name} {user.last_name}</p>
                                    </div>
                                    <div className="text-xs">{user.location}</div>
                                    <div className="flex gap-2 px-2 justify-center mt-6">
                                        <button
                                            className={isFollowing ? "rounded-2xl px-6 py-1 border hover:cursor-pointer bg-gradient-to-br from-fuchsia-700 to-indigo-500 text-white" : "rounded-2xl px-6 py-1 border hover:cursor-pointer"}
                                            onClick={() => toggleFollow(user.id)}
                                        >
                                            {isFollowing ? "Following" : "Follow"}
                                        </button>
                                        <button className="rounded-2xl px-6 py-1 border hover:cursor-pointer">{isFriends ? "Friend" : "Add Friend"}</button>
                                    </div>
                                    <div className="mt-4">{user.about_me}</div>
                                    <div className="flex gap-2">
                                        {user.things_user_likes.map((hobby) => (
                                            <div key={hobby} className="bg-slate-200 mt-4 px-4 py-1 rounded-2xl">{hobby}</div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        <div></div>
                        <div className="mx-auto">
                            <button
                                className="my-6 px-6 py-2 bg-gradient-to-br from-fuchsia-700 to-indigo-500 text-white rounded-2xl"
                                onClick={handleLoadMore}
                                disabled={loading}  // disable button while loading
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    </>
                ) : (
                    <div>
                        <p>No users</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FindFriends;
