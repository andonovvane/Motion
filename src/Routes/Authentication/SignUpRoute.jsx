import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MotionSignInLogo from "../../Components/MotionBg/MotionLoginBg";
import { 
    StyledForm, 
    StyledH1Form, 
    StyledHeader, 
    StyledHeaderButton, 
    StyledInput, 
    StyledLeftDiv, 
    StyledMainDiv, 
    StyledRightDiv,
    SignInDiv,
} from "../../Styles/Authentication/SignInUpStyles"
import { StyledSubmitButton } from "../../Styles/Buttons";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSignInClick = () => {
        navigate('/');
    }

    const handleSignUpClick = () => {
        navigate('/verification');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignUpClick();
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <StyledMainDiv>
            <StyledLeftDiv>
                <MotionSignInLogo />
            </StyledLeftDiv>
            <StyledRightDiv>
                <StyledHeader>
                    <p>Already have an account?</p>
                    <StyledHeaderButton onClick={handleSignInClick}>Sign In</StyledHeaderButton>
                </StyledHeader>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledH1Form>Sign Up</StyledH1Form>
                    <StyledInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required    
                    />
                    <SignInDiv>
                        <StyledSubmitButton type="submit">Sign Up</StyledSubmitButton>
                    </SignInDiv>
                </StyledForm>
            </StyledRightDiv>
        </StyledMainDiv>
    )
}

export default SignUp;
