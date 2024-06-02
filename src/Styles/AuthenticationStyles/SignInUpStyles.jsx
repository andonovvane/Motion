import styled from "styled-components";

export const StyledMainDiv = styled.main `
    display: flex;
    flex-direction: row;
`

export const StyledLeftDiv = styled.div `
    display: flex;
    width: 40%;
`

export const StyledRightDiv = styled.div `
    display: flex;
    flex-direction: column;
    width: 60%;
`

export const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
    margin-right: 2rem;
    margin-top: 1rem;
`

export const StyledHeaderButton = styled.button`
    border-radius: 20px;
    padding: 0.5rem 2rem;
    background-color: inherit;
    border-width: 0.5px;

    &:hover {
        cursor: pointer;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7rem;
`
export const StyledH1Form = styled.h1`
    font-size: 2rem;
    background: linear-gradient(45deg, #8e44ad, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`

export const StyledInput = styled.input`
    display: flex;
    flex-direction: row;
    width: 50%;
    margin-top: 3rem;
    padding: 0.5rem 0 0.5rem 1rem;
    font-size: large;
    border: none;
    border-bottom: 0.5px solid black;

    &:focus {
        border-bottom: 2px solid;
        border-color: blue ;
        outline: none
    }
`
export const SignInDiv = styled.div`
    display: flex;
    align-self:center;
    margin-top: 5rem;
`
export const StyledErrorP = styled.p`
    color: red;
    font-size: 1rem;
    margin-top: 2rem;
`