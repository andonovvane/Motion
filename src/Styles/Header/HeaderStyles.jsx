import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
    height: 80px;
    background-color: white;
    color: black;
    box-sizing: border-box;
`;

export const StyledH1Header = styled.header`
    margin-left: 10px;
    margin-right: 15%;
`;

export const StyledNav = styled.nav`
    display: flex;
    width: 700px;
    height: 100%;
`;
export const StyledAHeader = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    border-top: none;
    border-left: none;
    border-right: none;
    text-decoration: none;
    color: inherit;
    &:focus {
        border-bottom: solid 1px;
        padding-bottom: 5px
    }
    img {
        height: 20px;
    }
`;

export const StyledAHeaderRight = styled.a`
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    border-top: none;
    border-left: none;
    border-right: none;
    text-decoration: none;
    color: inherit;
    margin-left: 20px;
    margin-right: 2px;
    &:focus {
        border-bottom: solid 1px;
        padding-bottom: 5px
    }
`;

export const StyledSectionHeader = styled.section`
    display: flex;
    justify-content: space-between;
    width: auto;
    gap: 10px;
    text-decoration: none;
    color: inherit;
`;

export const StyledleftContainer = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
`

export const StyledRighContainer = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
`

export const StyledImg = styled.img `
    
`

export const StyledImgPopUp = styled.img`
    width: 20px;
    height: 20px;
    padding-right: 10px;
`

export const StyledP = styled.p`
    margin-left: 10px;
`

export const PopUpP = styled.div`
    padding: 5px 20px;
    display: flex;
    flex-direction: row;
`

export const PopUpProfile = styled.div`
    position: absolute;
    top: 60%;
    left: 90%;
    transform: translateX(-50%);
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    z-index: 1000;
`

export const NotificationsSpan = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const ThreeDotsSpan = styled.span`
    position: absolute;
    right: 10px;
    top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 1000;
    background-color: white;
    padding: 0 20px;
`

export const StyledATag = styled.a`
    display: flex;
    align-self: flex-start;
    padding-top: 5px;
    text-decoration: none;
    color: inherit;
    margin-top: 5px;
    margin-bottom: 5px;
`