import styled from 'styled-components';

const SideBarListItemContainer = styled.ul`
    @media (max-width: 768px) {
        position: absolute;
        top: 6rem;
        left: -100%;

        &.showMenu {
            position: fixed;
            top: 6rem;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100vh;
            background-color: rgba(24, 24, 27, 0.9);
            backdrop-filter: blur(8px);
            z-index: 999;
            transition: 0.7s ease;
        }
    }
`;

export { SideBarListItemContainer };
