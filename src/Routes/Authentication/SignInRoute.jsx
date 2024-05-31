// import { useNavigate } from "react-router-dom";
// import { api } from "../API/api";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loadUser, login } from "../Store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import MotionSignInLogo from "../../Components/MotionBg/MotionLoginBg";
import { StyledSubmitButton } from "../../Styles/Buttons";
import { SignInDiv, StyledForm, StyledH1Form, StyledHeader, StyledHeaderButton, StyledInput, StyledLeftDiv, StyledMainDiv, StyledRightDiv } from "../../Styles/Authentication/SignInUpStyles";


const Login = () => {
    const Navigate = useNavigate()

    const handleSignUpClick = () => {
        Navigate('/signup');
    }

    return (
        <StyledMainDiv>
            <StyledLeftDiv>
                <MotionSignInLogo />
            </StyledLeftDiv>
            <StyledRightDiv>
                <StyledHeader>
                        <p>Don`t have an account?</p>
                        <StyledHeaderButton
                            onClick={handleSignUpClick}>Sign Up</StyledHeaderButton>
                </StyledHeader>
                        <StyledForm action="submit">
                            <StyledH1Form>Sign In</StyledH1Form>
                            <StyledInput
                                type="email"
                                placeholder="Email"
                                required
                            />
                            <StyledInput 
                                type="password"
                                placeholder="Password"
                                required
                            />
                            <SignInDiv>
                                <StyledSubmitButton
                                    type="submit"
                                    >Sign In</StyledSubmitButton>
                            </SignInDiv>
                        </StyledForm>
            </StyledRightDiv>
        </StyledMainDiv>
    )
}

export default Login;