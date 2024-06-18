import { useState } from "react";
import { StyledAddPostDiv, StyledModal, StyledOverlay } from "../../Styles/PostsRouteStyles/PostsStyles";
import { api } from "../../API/api"
import { useDispatch } from "react-redux";
import { addPost } from "../../Store/Slices/postsSlice"


const AddPost = () => {
    const [popUp, setPopUp] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    
    const dispatch = useDispatch();

    const handlePost = async () => {
        try {
            const token = localStorage.getItem("accessToken");
        
            const formData = new FormData();
            formData.append("content", postContent);
        
            if (imageFile) {
                formData.append("images", imageFile);
            }
        
            const response = await api.post("/social/posts/", formData, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                },
            });
        
            dispatch(addPost(response.data));
            setPostContent("");
            setImageFile(null);
            setImagePreview(null);
            setPopUp(false);
            } catch (error) {
            console.log("Error creating post:", error);
            }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    return (
        <div>
            <StyledAddPostDiv>
                    <img src="src/Motion-assets/svgs/avatar.svg" alt="" />
                    <input 
                        type="text"
                        placeholder="What`s on your mind?"
                        onClick={() => setPopUp(true)}
                    />
                    <img src="src/Motion-assets/svgs/share.svg" alt="" />
            </StyledAddPostDiv>
            {popUp && (
                <>
                    <StyledOverlay>
                        <StyledModal>
                        {imagePreview && (
                        <>
                            <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                            />
                            <button onClick={handleRemoveImage}>Remove Image</button>
                        </>
                        )}
                        <textarea
                            rows="10"
                            placeholder="What's on your mind?..."
                            />
                            <input type="file" accept="image/*" onChange={handleImageChange}/>
                            <button onClick={handlePost} >Post</button>
                            <button onClick={() => setPopUp(false)}>Cancel</button>
                        </StyledModal>
                    </StyledOverlay>
                </>
            )}
        </div>
    )
}

export default AddPost;