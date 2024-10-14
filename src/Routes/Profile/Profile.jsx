import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../../API/api";
import { likePost } from "../../Store/Slices/postsSlice";
import placeholderAvatar from "../../../public/assets/svgs/avatar.svg";
import like from "../../../public/assets/svgs/heart.svg"
import share from "../../../public/assets/svgs/share.svg"
import motionbg from "../../../public/assets/images/motionbg.png";
import uploadIcon from "../../../public/assets/svgs/uploadIcon.svg"
import deleteIcon from "../../../public/assets/svgs/deleteIcon.svg"

const Profile = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("accessToken")
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const [myPosts, setMyPosts] = useState([]);
    const [editProfie, setEditProfile] = useState(false);
    const [updateImage, setUpdateImage] = useState(false);
    const [newHobby, setNewHobby] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        const getMyPosts = async () => {
            // const token = localStorage.getItem("accessToken");
            const res = await api.get("/social/posts/me/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setMyPosts(res.data.results);
            // console.log(myPosts)
        };

        getMyPosts();
    }, [token])

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
    const handleEditProfile = () => {
        setEditProfile(!editProfie);
    }
    const handleUpdateImage = () => {
        setUpdateImage(true);
    }
    const [formData, setFormData] = useState({
        email: userDetails.email || "",
        username: userDetails.username || "",
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        location: userDetails.location || "",
        phone_number: userDetails.phone_number || "",
        about_me: userDetails.about_me || "",
        password: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleHobbyInputChange = (e) => {
        setNewHobby(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, username, first_name, last_name, location, phone_number, about_me, password } = formData;
        try {
            const res = api.patch("/users/me/", { email, username, first_name, last_name, location, phone_number, about_me, password }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(res);

            const updatedUserDetails = {
                ...userDetails,
                email,
                username,
                first_name,
                last_name,
                location,
                phone_number,
                about_me
            }
            localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
            handleEditProfile();
            setUpdateImage(false);
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddHobby = (e) => {
        e.preventDefault();
        if (newHobby.trim()) {
            const updatedHobbies = [...userDetails.things_user_likes, newHobby];

            setFormData({
                ...formData,
                things_user_likes: updatedHobbies
            });

            const updatedUserDetails = {
                ...userDetails,
                things_user_likes: updatedHobbies
            };
            localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));

            setNewHobby("");
        }
    };
    const handleDeleteHobby = (hobbyToDelete) => {
        const updatedHobbies = userDetails.things_user_likes.filter(hobby => hobby !== hobbyToDelete);

        setFormData({
            ...formData,
            things_user_likes: updatedHobbies
        });

        const updatedUserDetails = {
            ...userDetails,
            things_user_likes: updatedHobbies
        };
        localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    }
    const handleImageUpload = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('avatar', selectedImage);

        try {
            const response = await api.patch('/users/me/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
                },
            });

            // Assuming your API returns the updated user object with the new avatar URL
            const updatedUserDetails = {
                ...userDetails,
                avatar: response.data.avatar, // Update the avatar in userDetails
            };

            // Update local storage
            localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));

            // Update state to trigger re-render
            setFormData({ ...formData, avatar: response.data.avatar });
            setSelectedImage(null); // Reset selected image
            setUpdateImage(false);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const handleRemoveImage = async () => {
        try {
            const token = localStorage.getItem("accessToken");
    
            // Create form data and set avatar to an empty string
            const formData = new FormData();
            formData.append('avatar', ""); // Sending an empty string
    
            // Make the API request to remove the avatar (similar to uploading an image)
            await api.patch('/users/me/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Required for file upload
                },
            });
    
            // Update local storage and state to reflect the removed avatar
            const updatedUserDetails = { ...userDetails, avatar: null }; // Clear the avatar
            localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    
            // Update the UI
            setFormData((prevFormData) => ({
                ...prevFormData,
                avatar: null, // Reflect removal of the avatar in the form data
            }));
    
            setSelectedImage(null); // Clear selected image state
            setUpdateImage(false);
        } catch (error) {
            console.error("Error removing avatar:", error);
        }
    };    


    return (
        <div className="box-border overflow-x-hidden">
            <div className="w-full h-[250px]">
                <img src={motionbg} alt="background" className="w-full h-full object-cover" />
            </div>
            {(!editProfie) ? (
                <div className="relative flex border bg-white mt-[-150px] w-[90%] p-8 ml-[5%]">
                    <div className="flex flex-col w-1/4 items-center">
                    <img src={userDetails.avatar || placeholderAvatar} alt="Avatar" className="w-[70px] h-[70px] rounded-full" />
                        <div className="text-xl mt-4">{userDetails.first_name} {userDetails.last_name}</div>
                        <div className="text-xs">{userDetails.location}</div>
                        <button className="mt-10 border-2 rounded-3xl px-6 py-1" onClick={handleEditProfile}>Edit Profile</button>
                    </div>
                    <div className="flex flex-col border-l w-3/4">
                        <div className="flex flex-col gap-5 my-3">
                            <div className="flex justify-between">
                                <div className="w-1/2 mx-2">
                                    <p>About me:</p>
                                    <p className="mt-3">{userDetails.about_me}</p>
                                </div>
                                <div className="w-1/2 mx-2">
                                    <div>
                                        <p>Things I like:</p>
                                    </div>
                                    <div className="flex gap-4 mt-3">
                                        {userDetails.things_user_likes.map((hobby) => (
                                            <div key={hobby} className="border bg-slate-200 px-4 py-1 rounded-3xl">
                                                {hobby}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 mx-2">
                                    <p>Email:</p>
                                    <p>{userDetails.email}</p>
                                </div>
                                <div className="w-1/2">
                                    <p>Phone:</p>
                                    <p>{userDetails.phone_number}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-evenly border-t py-4">
                            <div>
                                <p>posts</p>
                                {userDetails.amount_of_posts}
                            </div>
                            <div>
                                <p>likes</p>
                                {userDetails.amount_of_likes}
                            </div>
                            <div>
                                <p>friends</p>
                                {userDetails.amount_of_friends}
                            </div>
                            <div>
                                <p>followers</p>
                                {userDetails.amount_of_followers}
                            </div>
                            <div>
                                <p>following</p>
                                {userDetails.amount_following}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative flex border bg-white mt-[-150px] w-[90%] p-8 ml-[5%]">
                    <div className="flex flex-col w-1/4 items-center justify-between">
                        <div className="flex items-center flex-col">
                        <img src={userDetails.avatar || placeholderAvatar} alt="Avatar" className="w-[70px] h-[70px] rounded-full" />
                            {updateImage ? (
                                <div className="mt-5 w-[100%] hover:cursor-pointer border">
                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        accept="image/*" // Limit to image files
                                        onChange={handleImageChange} // Capture file selection
                                        className="hidden"
                                        id="file-input" // Add an id for the label to target
                                    />

                                    {/* Upload Button */}
                                    <label htmlFor="file-input" className="flex py-1 px-6 w-full hover:bg-slate-200 border-b cursor-pointer">
                                        <img src={uploadIcon} alt="Upload" />
                                        <span>Upload</span>
                                    </label>

                                    {/* Remove Button */}
                                    <div className="flex py-1 px-6 w-full hover:bg-slate-200">
                                        <img src={deleteIcon} alt="Delete" />
                                        <button onClick={handleRemoveImage}>Remove</button>
                                    </div>

                                    {/* Save Image Button */}
                                    {selectedImage && (
                                        <button onClick={handleImageUpload} className="mt-2 border-2 rounded-3xl px-6 py-1">
                                            Save Image
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <button className="mt-2 border-2 rounded-3xl px-6 py-1" onClick={handleUpdateImage}>Update Image</button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <button className="mt border-2 rounded-3xl px-6 py-1">Delete Account</button>
                            <button className=" border-2 rounded-3xl px-6 py-1" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                    <div className="flex flex-col border-l w-3/4">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 p-4">  {/* Adjusted to grid with two columns */}
                                {/* Column 1 */}
                                <div className="flex flex-col">
                                    <p>Email:</p>
                                    <input className="p-2 border-b-2" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <p>Username:</p>
                                    <input className="p-2 border-b-2" type="text" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required />
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col mt-10">
                                    <p>First Name:</p>
                                    <input className="p-2 border-b-2" type="text" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
                                </div>
                                <div className="flex flex-col mt-10">
                                    <p>Last Name:</p>
                                    <input className="p-2 border-b-2" type="text" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleInputChange} required />
                                </div>

                                {/* Column 1 */}
                                <div className="flex flex-col mt-10">
                                    <p>Location:</p>
                                    <input className="p-2 border-b-2" type="text" placeholder="Location" name="location" value={formData.location} onChange={handleInputChange} required />
                                </div>
                                <div className="flex flex-col mt-10">
                                    <p>Phone:</p>
                                    <input className="p-2 border-b-2" type="text" placeholder="Phone" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required />
                                </div>

                                {/* Column 2 */}
                                <div className="flex flex-col mt-10">
                                    <p>About:</p>
                                    <textarea className="p-2 border-b-2" type="text" placeholder="About" name="about_me" value={formData.about} onChange={handleInputChange} required />
                                </div>
                                {/* <div className="flex flex-col mt-10">
                                <p>Password:</p>
                                <input className="mt-6 p-2 border-b-2" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
                            </div> */}
                            </div>

                            <div className=" flex justify-center flex-col ml-5">
                                <div>
                                    <p>Things I like:</p>
                                </div>
                                <div className="flex gap-4 mt-3">
                                    {userDetails.things_user_likes.map((hobby) => (
                                        <div key={hobby} className=" flex border bg-slate-200 px-4 py-1 rounded-3xl">
                                            {hobby}
                                            <img src={deleteIcon} alt="" className="ml-3 hover:cursor-pointer" onClick={() => handleDeleteHobby(hobby)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-end">
                                <input className="mt-8 mx-5 p-2 border-b-2 w-[80%]" type="text" placeholder="Type something ..." name="about_me" value={newHobby} onChange={handleHobbyInputChange} required />
                                <div className="border-black border px-5 py-1 rounded-3xl"><button onClick={handleAddHobby}>ADD</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* My Posts Section */}
            {(!editProfie) ? (
                <div className="grid grid-cols-2 gap-6 auto-rows-auto mt-[50px] mx-[5%]">
                    {myPosts.length > 0 ? (
                        myPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border w-full">
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
                                    <div className="text-gray-700 my-2">{post.content ? post.content : "Not content"}</div>
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
                        <div>
                            No Posts Avaiable
                        </div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Profile;
