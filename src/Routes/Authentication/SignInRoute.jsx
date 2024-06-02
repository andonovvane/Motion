import MotionSignInLogo from "../../Components/MotionBg/MotionLoginBg";
import { StyledSubmitButton } from "../../Styles/Buttons";
import { SignInDiv, StyledErrorP, StyledForm, StyledH1Form, StyledHeader, StyledHeaderButton, StyledInput, StyledLeftDiv, StyledMainDiv, StyledRightDiv } from "../../Styles/AuthenticationStyles/SignInUpStyles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../API/api";
import { useDispatch } from "react-redux";
import { loadUser, login } from "../../Store/Slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUpClick = () => {
        navigate('/signup');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/token/", { email, password });
            localStorage.setItem("accessToken", res.data.access);
            dispatch(login(res.data.access));
            dispatch(loadUser(res.data.user));
            console.log(res.data);
            setLoginError("");
            navigate("/posts");
        } catch (error) {
            console.log(error);
            if (error.response?.data?.detail) {
                setLoginError(error.response.data.detail);
            } else {
                setLoginError("Login Failed");
            }
        }
    };

    return (
        <StyledMainDiv>
            <StyledLeftDiv>
                <MotionSignInLogo />
            </StyledLeftDiv>
            <StyledRightDiv>
                <StyledHeader>
                    <p>Don`t have an account?</p>
                    <StyledHeaderButton onClick={handleSignUpClick}>Sign Up</StyledHeaderButton>
                </StyledHeader>
                <StyledForm onSubmit={handleSignInSubmit}>
                    <StyledH1Form>Sign In</StyledH1Form>
                    <StyledInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <StyledInput 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <SignInDiv>
                        <StyledSubmitButton type="submit">Sign In</StyledSubmitButton>
                    </SignInDiv>
                    <StyledErrorP>{loginError}</StyledErrorP>
                </StyledForm>
            </StyledRightDiv>
        </StyledMainDiv>
    );
};

export default Login;
