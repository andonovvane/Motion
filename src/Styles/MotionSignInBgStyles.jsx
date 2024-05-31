import styled from "styled-components";

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: 
        linear-gradient(102deg, rgba(115, 0, 186, 0.588), rgba(4, 57, 216, 0.52)),
        url("src/Motion-assets/images/background_image.png");
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

export const StyledContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const StyledImg = styled.img`
    width: 60px;
`;

export const StyledP = styled.p`
    color: rgba(255, 255, 255, 0.886);
    margin-bottom: 50px;
`;

export const StyledBtnDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;
    gap: 1rem;

    & :hover {
        cursor: pointer;
    }
`;

export const StyledBtnP = styled.p`
    color: white;
    margin: 10px 20px;
`;

export const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 25px;
`;

export const StyledAppImg = styled.img`
    padding: 5px 10px;
    align-self: center;
`;

export const StyledSignInFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledSignInFooterIcons = styled.div`
    display: flex;
    flex-direction: row;
`;

export const StyledAppIcon = styled.img`
    display: flex;
    max-width: 1.5rem;
    justify-content: space-between;
    margin: auto 1rem;

    &:hover {
        cursor: pointer;
    }
`;

