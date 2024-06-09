import {StyledATag, 
        StyledHeaderDiv, 
        StyledPostsHeader, 
        StyledSearchField, 
        StyledSpanHeader } from "../../Styles/PostsRouteStyles/PostsStyles"
import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm, selectSearchTerm } from "../../Store/Slices/searchSlice"


const PostsRouteHeader = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm)

    const handleSearch = () => {
        dispatch(setSearchTerm(searchTerm));
    };
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div>
            <StyledPostsHeader>
                <StyledHeaderDiv>
                    <img src="src/Motion-assets/svgs/search_icon.svg" />
                    <StyledSearchField 
                        type="search"
                        name="search"
                        placeholder="Search posts .."
                        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                        onKeyDown={handleKeyDown}
                    />
                </StyledHeaderDiv>

                <StyledSpanHeader>
                    <StyledATag href="">All</StyledATag>
                    <StyledATag href="">Liked</StyledATag>
                    <StyledATag href="">Friends</StyledATag>
                    <StyledATag href="">Follow</StyledATag>
                </StyledSpanHeader>
            </StyledPostsHeader>
        </div>
    )
}

export default PostsRouteHeader