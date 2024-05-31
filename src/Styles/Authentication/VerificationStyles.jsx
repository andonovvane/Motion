import styled from "styled-components";

export const StyledRightVerificationDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
`

export const StyledVerificationForm = styled.form `
    display: flex;
    flex-direction: column;
    width: 80%;
`

export const StyledH1VerificationForm = styled.h1`
    display: flex;
    align-self: center;
`

export const StyledValidationInput = styled.input`
    width: 90%;
    border: none;
    border-bottom: 1px solid;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    font-size: 1rem;

    &:focus {
        border-bottom: 2px solid;
        border-color: blue ;
        outline: none
    }
`

export const StyledInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
`

export const StyledHalfInput = styled.input`
    width: 50%;
    border: none;
    border: none;
    border-bottom: 1px solid;
    font-size: 1rem;
    padding: 1rem 2rem;

    &:focus {
        border-bottom: 2px solid;
        border-color: blue ;
        outline: none

    }
`



