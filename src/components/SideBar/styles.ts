import styled from 'styled-components';

const SideBarContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24.5rem;
    height: 100vh;
    padding: 8rem 0;
    border-radius: 0 36px 36px 0;
    background-color: var(--dark-surface-primary);

    @media (max-width: 768px) {
        width: 100%;
        height: 6rem;
        padding: 0;
        border-radius: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid var(--background);
        overflow-y: hidden;
        z-index: 999;
    }
`;

export { SideBarContainer };
