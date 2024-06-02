import { StyledAppIcon, StyledAppImg, StyledBtnDiv, StyledButton, StyledImg, StyledMain, StyledP, StyledSignInFooter, StyledSignInFooterIcons, StyledContentWrapper } from "../../Styles/AuthenticationStyles/MotionSignInBgStyles";

const MotionSignInLogo = () => {
    return (
        <StyledMain>
            <StyledContentWrapper>
                <StyledImg src="src/Motion-assets/images/logo_white.png" />
                <h1>Motion</h1>
                <StyledP>Connect with friends and the world around you with Motion</StyledP>
                <StyledBtnDiv>
                    <StyledButton>
                        <StyledAppImg src="src/Motion-assets/svgs/apple.svg" alt="" />
                    </StyledButton>
                    <StyledButton>
                        <StyledAppImg src="src/Motion-assets/svgs/google.svg" alt="" />
                    </StyledButton>
                </StyledBtnDiv>
            </StyledContentWrapper>
            <StyledSignInFooter>
                <StyledSignInFooterIcons>
                    <StyledAppIcon src="src/Motion-assets/svgs/twitter_icon.svg" alt="" />
                    <StyledAppIcon src="src/Motion-assets/svgs/facebook_icon.svg" alt="" />
                    <StyledAppIcon src="src/Motion-assets/svgs/instagram_icon.svg" alt="" />
                </StyledSignInFooterIcons>
                <StyledP>Motion 2024. All rights reserved</StyledP>
            </StyledSignInFooter>
        </StyledMain>
    );
}

export default MotionSignInLogo;
