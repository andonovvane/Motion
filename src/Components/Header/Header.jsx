import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/userSlice";
import { StyledAHeaderRight, 
        StyledATag, 
        StyledHeader, 
        StyledImg, 
        StyledImgPopUp, 
        StyledP, 
        StyledRighContainer, 
        StyledleftContainer, 
        ThreeDotsSpan,
        StyledNav,
        StyledAHeader,
        StyledSectionHeader,
        StyledH1Header } from "../../Styles/Header/HeaderStyles";


    const Header = () => {
            const [isPopupVisible, setPopupVisible] = useState(false);
            const [isNotificationsVisible, setNotificationsVisible] = useState(false);
            const dispatch = useDispatch();
        
            const handleNotificationsClick = () => {
                setNotificationsVisible(!isNotificationsVisible);
            }
        
            const handleHeaderClick = (event) => {
                event.preventDefault();
                setPopupVisible(!isPopupVisible);
            };
        
            const handleLogout = () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userDetails");
                dispatch(logout());
            }
        
        
            return (
                <StyledHeader>
                    <StyledleftContainer>
                        <StyledImg src="src/Motion-assets/images/logo.png" />
                        <StyledH1Header>Motion</StyledH1Header>

                        <StyledNav>
                            <StyledAHeader href="/posts">
                                <StyledImg src="src/Motion-assets/images/posts_logo.png" />
                                <StyledP>Posts</StyledP>
                            </StyledAHeader>
                            <StyledAHeader  href="">
                                <StyledImg src="src/Motion-assets/svgs/icon-friends.svg" />
                                <StyledP>Find Friends</StyledP>
                            </StyledAHeader>
                        </StyledNav>
                    </StyledleftContainer>

                    <StyledRighContainer>
                        <StyledSectionHeader>
                            <StyledAHeaderRight href="" onClick={handleNotificationsClick}>
                                <StyledImg src="src/Motion-assets/svgs/notification_bell.svg" />
                            </StyledAHeaderRight>
                            <StyledAHeaderRight  href="">
                                <StyledImg src="src/Motion-assets/svgs/avatar.svg" />
                            </StyledAHeaderRight>
                            <StyledAHeaderRight  href="" onClick={(event) => handleHeaderClick(event)}>
                                <StyledImg src="src/Motion-assets/svgs/menu.svg" />
                            </StyledAHeaderRight>
                        </StyledSectionHeader>
                    </StyledRighContainer>
                    {isPopupVisible && (
                    <ThreeDotsSpan>
                        <StyledATag href="">
                            <StyledImgPopUp src="src/Motion-assets/svgs/avatar.svg" />
                            Profile
                            </StyledATag>
                        <StyledATag onClick={handleLogout} href="/">
                            <StyledImgPopUp src="src/Motion-assets/svgs/heart.svg" />
                            Logout
                            </StyledATag>
                    </ThreeDotsSpan>
                    )}
                </StyledHeader>
            )
    }
        
export default Header