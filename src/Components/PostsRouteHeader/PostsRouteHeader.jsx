import {StyledATag, 
        StyledHeaderDiv, 
        StyledPostsHeader, 
        StyledSearchField, 
        StyledSpanHeader } from "../../Styles/PostsRouteStyles/PostsStyles"


const PostsRouteHeader = () => {


    return (
        <div>
            <StyledPostsHeader>
                <StyledHeaderDiv>
                    <img src="src/Motion-assets/svgs/search_icon.svg" />
                    <StyledSearchField 
                        type="search"
                        name="search"
                        placeholder="Search posts .."
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