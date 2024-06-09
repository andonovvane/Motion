import styled from "styled-components";

export const StyledPostsHeader = styled.header`
    position: fixed;
    top: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    background-color: white;
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

/************************************************************/


export const StyledBodyPostsRoute = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #333;
    margin-top: 400px;
    margin-left: 4rem;
`;

export const StyledPPostsRoute = styled.p`
    display: flex;
    justify-content: flex-start;
`;

export const StyledDivContainerPostsRoute = styled.div`
    margin-top: 100px;
    padding-top: 400px;
    height: calc(100vh - 150px);
    overflow-y: auto;
    scrollbar-color: transparent transparent;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        width: 6px;
    }

    position: fixed;
    width: 80%;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 0 2%;
`;

export const StyledSendIcon = styled.img`
    transform: rotate(90deg);
`;

export const StyledDivPostsRoute = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45%;
    color: #333;
    img {
        align-self: center;
    }

    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    text-align: left;
`;

export const StyledDivColumns = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
`;

export const StyleduserPostDiv = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
`;

export const StyledProfileAndUserPostDiv = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
`;

export const StyledlikeSharePostsRoute = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    div {
        display: flex;
        gap: 2rem;
    }
    button {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 40%;
        align-self: center;
        background: none;
        border: none;
        color: #333;

        &:active {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
    }
`;

export const StyledDivAddPost = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 46%;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    div {
        display: flex;
        align-items: center;
        gap: 50px;
    }

    input {
        background: none;
        border: none;
        padding-right: 15%;
    }
`;

export const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

export const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;
