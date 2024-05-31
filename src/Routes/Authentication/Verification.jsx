import MotionSignInLogo from "../../Components/MotionBg/MotionLoginBg";
import { StyledLeftDiv, StyledMainDiv, SignInDiv } from "../../Styles/Authentication/SignInUpStyles";
import { StyledH1VerificationForm, StyledHalfInput, StyledInputDiv, StyledRightVerificationDiv, StyledValidationInput, StyledVerificationForm } from "../../Styles/Authentication/VerificationStyles"
import { StyledSubmitButton } from "../../Styles/Buttons";
const Verification = () => {

    return (
        <StyledMainDiv>
            <StyledLeftDiv>
                <MotionSignInLogo />
            </StyledLeftDiv>
            <StyledRightVerificationDiv>
                <StyledVerificationForm action="">
                    <StyledH1VerificationForm>Verification</StyledH1VerificationForm>
                    <StyledValidationInput 
                        type="text"
                        placeholder="Validation Code"
                    />
                    <StyledInputDiv>
                        <StyledHalfInput 
                            type="text"
                            placeholder="Email"
                        />
                        <StyledHalfInput  
                        type="text"
                        placeholder="Username"
                    />
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledHalfInput  
                            type="text"
                            placeholder="First Name"
                        />
                        <StyledHalfInput  
                        type="text"
                        placeholder="Last Name"
                        />
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledHalfInput
                            type="text"
                            placeholder="Password"
                        />
                        <StyledHalfInput  
                            type="text"
                            placeholder="Password Repeat"
                        />
                    </StyledInputDiv>
                    <SignInDiv>
                        <StyledSubmitButton type="submit">Complete</StyledSubmitButton>
                    </SignInDiv>
                </StyledVerificationForm>
            </StyledRightVerificationDiv>
        </StyledMainDiv>
    )
}

export default Verification;