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
    StyledErrorP,
} from "../../Styles/AuthenticationStyles/SignInUpStyles"
import { StyledSubmitButton } from "../../Styles/Buttons";
import { api } from "../../API/api";

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const handleSignInClick = () => {
        navigate('/');
    }

    const handleSignUpClick = () => {
        navigate('/verification');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post("/auth/registration/", {email});
            console.log("Registration successful ",res.data);
            handleSignUpClick();
        } catch (err) {
            console.error("Registration Error ",err);
            if (err.response?.data?.email) {
                setError(err.response.data.email[0]);
            } else {
                setError("Registration failed. Please check your input.");
            }
        }
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
                    <StyledErrorP>{error}</StyledErrorP>
                </StyledForm>
            </StyledRightDiv>
        </StyledMainDiv>
    )
}

export default SignUp;
