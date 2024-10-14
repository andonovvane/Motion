import avatarPlaceholder from "../assets/svgs/avatar.svg";
import uploadIcon from "../assets/svgs/uploadicon.svg"
import upload from "../assets/images/send_button.png";
import { useEffect, useState } from "react";
import { api } from "../API/api";
import { useDispatch } from "react-redux";
import { addPost } from "../Store/Slices/postsSlice";

const AddPost = () => {
    const dispatch = useDispatch();
    const storedUserDetails = localStorage.getItem("userDetails");
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [toggleNewPost, setToggleNewPost] = useState(false);
    const [placeholder, setPlaceholder] = useState('');
    let firstName = '';
    let avatar = avatarPlaceholder;

    if (storedUserDetails) {
        const parsedUserDetails = JSON.parse(storedUserDetails);
        avatar = parsedUserDetails.avatar || avatarPlaceholder;
        firstName = parsedUserDetails.first_name;
    }

    useEffect(() => {
            setPlaceholder(`What's on your mind, ${firstName}?`);
    }, [toggleNewPost, firstName]);

    const handleNewPost = () => {
        setToggleNewPost(!toggleNewPost);
        setText('');
        setImageFile(null);
        setImagePreview(null); 
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const submitPost = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const formData = new FormData();
            formData.append("content", text);
            formData.append("images", imageFile);

            const response = await api.post("/social/posts/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            dispatch(addPost(response.data));
            // setImageFile(null);
            // setImagePreview(null);
            // setText('');
            setToggleNewPost(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {!toggleNewPost ? (
                <div className="flex items-center justify-between mx-4 h-full" onClick={handleNewPost}>
                    <div className="flex gap-5 items-center w-full">
                        <img src={avatar} alt="" className="w-[50px] h-[50px] rounded-full" />
                        <input type="text" name="" placeholder={placeholder} id="userInput" className="w-3/4 border-x-black" />
                    </div>
                    <img src={upload} alt="" className="bg-gradient-to-br from-fuchsia-600 to-indigo-400 px-3 py-3 rounded-full hover:cursor-pointer" />
                </div>
            ) : (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-[40%] h-[80%] bg-white rounded-lg shadow-lg p-6">
                        {/* Close Button */}
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleNewPost}>
                            &#x2715;
                        </button>

                        {/* User Avatar and Text Area */}
                        <div className="mb-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    id="userAvatar"
                                    alt="User Avatar"
                                    src={avatar}
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                                <textarea
                                    id="textArea"
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Write something here..."
                                    className="flex-grow h-24 p-2 border border-gray-300 rounded-md resize-none"
                                />
                            </div>
                        </div>

                        {/* Uploaded Images Preview */}
                        <div className="overflow-y-auto h-[200px] grid grid-cols-3 gap-2 mb-4 border p-2 rounded-md">
                            {imageFile && (
                                <div className="border border-gray-200 rounded-lg p-1">
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* File Upload and Submit */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                className="hidden"
                                onChange={handleFileUpload}
                                multiple
                            />
                            <label htmlFor="fileInput" className="flex items-center space-x-2 cursor-pointer">
                                <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
                                <span className="text-blue-500 hover:underline">Upload Image</span>
                            </label>
                            <button className="bg-gradient-to-br from-fuchsia-600 to-indigo-400 text-white px-4 py-2 rounded-full hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-indigo-300" onClick={submitPost}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPost;
