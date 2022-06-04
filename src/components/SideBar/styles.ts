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
`;

export { SideBarContainer };
