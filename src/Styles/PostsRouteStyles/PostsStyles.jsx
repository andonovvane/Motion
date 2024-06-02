import styled from "styled-components";

export const StyledPostsHeader = styled.header`
    position: fixed;
    top: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
`

export const StyledSearchField = styled.input`
    display: flex;
    border: none;
    width: 40rem;
    padding: 0.3rem 1rem;
    font-size: 1rem;

    &:focus {
        border-bottom: 0.5px solid gray;
        outline: none;
    }
`

export const StyledSpanHeader = styled.header`
    display: flex;
    gap: 1rem;
    margin-right: 10rem;
`

export const StyledATag = styled.a`
    text-decoration: none;
    color: inherit;
`

export const StyledHeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-left: 10rem;
`