import styled from 'styled-components';

const SideBarButtonLogoutContainer = styled.button`
    width: 100%;
    height: 6.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 5.6rem;
    color: var(--white);
    border: none;
    background-color: transparent;
    svg {
        width: 2rem;
        height: 2rem;
        margin-right: 0.8rem;
    }
    p {
        display: inline-block;
        font-size: 1.4rem;
        font-weight: 500;
    }
    &:hover {
        svg {
            color: var(--orange);
        }
        p {
            color: var(--orange);
        }
    }

    @media (max-width: 768px) {
        border-bottom: 1px solid var(--white);
    }
`;

export { SideBarButtonLogoutContainer };
