import styled from 'styled-components';

interface IBannerProps {
    sideImage: 'left' | 'right';
}

interface IContentProps {
    contentSide: 'left' | 'right';
}

const ContainerAuth = styled.main`
    position: relative;
    width: 100%;
    height: 100vh;
    /* display: flex; */
`;

const Banner = styled.section<IBannerProps>`
    position: fixed;
    left: ${props => (props.sideImage === `left` ? `0` : `auto`)};
    right: ${props => (props.sideImage === `right` ? `0` : `auto`)};
    top: 0;
    bottom: 0;
    width: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ContentAuth = styled.section<IContentProps>`
    position: absolute;
    left: ${props => (props.contentSide === `left` ? `0` : `auto`)};
    right: ${props => (props.contentSide === `right` ? `0` : `auto`)};
    top: 0;
    width: 50%;
    display: flex;
    justify-content: center;
`;

export { ContainerAuth, Banner, ContentAuth };
