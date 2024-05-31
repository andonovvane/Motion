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
} from "../../Styles/SignInUpStyles"
import { SignInButton } from "../../Styles/Button";

const SignUp = () => {
    const Navigate = useNavigate()

    const handleSignInClick = () => {
        Navigate('/')
    }

    return (
        <StyledMainDiv>
            <StyledLeftDiv>
                <MotionSignInLogo />
            </StyledLeftDiv>
            <StyledRightDiv>
                <StyledHeader>
                    <p>Already have an account?</p>
                    <StyledHeaderButton
                        onClick={handleSignInClick}>Sign In</StyledHeaderButton>
                </StyledHeader>
                <StyledForm>
                    <StyledH1Form>Sign Up</StyledH1Form>
                    <StyledInput
                        type="email"
                        placeholder="Email"    
                    />
                </StyledForm>
                <SignInDiv>
                    <SignInButton>Sign Up</SignInButton>
                </SignInDiv>
            </StyledRightDiv>
        </StyledMainDiv>
    )
}

export default SignUp;