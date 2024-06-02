import { useState } from "react";
import MotionSignInLogo from "../../Components/MotionBg/MotionLoginBg";
import { StyledLeftDiv, StyledMainDiv, SignInDiv, StyledErrorP } from "../../Styles/AuthenticationStyles/SignInUpStyles";
import { StyledH1VerificationForm, StyledHalfInput, StyledInputDiv, StyledRightVerificationDiv, StyledValidationInput, StyledVerificationForm } from "../../Styles/AuthenticationStyles/VerificationStyles"
import { StyledSubmitButton } from "../../Styles/Buttons";
import { api } from "../../API/api";
import { useDispatch } from "react-redux";
import { loadUser } from "../../Store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
const Verification = () => {
    const [validationCode, setValidationCode] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.patch("/auth/registration/validation/", {
                email,
                username,
                code: validationCode,
                password,
                password_repeat: passwordRepeat,
                first_name: firstName,
                last_name: lastName,
            });
            console.log(res)
            dispatch(loadUser(res.data));
            navigate("/");
        } catch (err) {
            console.error("Registration Error ",err);
            if (err.response?.data?.email) {
                setError(err.response.data.email[0]);
            } else {
                setError("Registration failed. Please check your input.");
            }
        }
    }

    return (
        <StyledMainDiv>
            <StyledLeftDiv>
                <MotionSignInLogo />
            </StyledLeftDiv>
            <StyledRightVerificationDiv>
                <StyledVerificationForm onSubmit={handleVerificationSubmit}>
                    <StyledH1VerificationForm>Verification</StyledH1VerificationForm>
                    <StyledValidationInput 
                        type="text"
                        placeholder="Validation Code"
                        value={validationCode}
                        onChange={(e) => setValidationCode(e.target.value)}
                        required
                    />
                    <StyledInputDiv>
                        <StyledHalfInput 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <StyledHalfInput  
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledHalfInput  
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <StyledHalfInput  
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledHalfInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <StyledHalfInput  
                            type="password"
                            placeholder="Password Repeat"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            required
                        />
                    </StyledInputDiv>
                    <SignInDiv>
                        <StyledSubmitButton type="submit">Complete</StyledSubmitButton>
                    </SignInDiv>
                    <StyledErrorP>{error}</StyledErrorP>
                </StyledVerificationForm>
            </StyledRightVerificationDiv>
        </StyledMainDiv>
    )
}

export default Verification;