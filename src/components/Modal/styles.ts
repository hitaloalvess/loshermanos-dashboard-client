import styled from 'styled-components';

const ModalContent = styled.dialog`
    padding: 4.4rem 12.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: none;
    border-radius: 5px;
    margin: auto;
    background-color: var(--background);

    @media (max-width: 468px) {
        padding: 2.4rem;
    }
`;

const ModalButtonClose = styled.button`
    position: absolute;
    top: 3.2rem;
    right: 3.2rem;
    border: none;
    background-color: transparent;

    svg {
        width: 1.8rem;
        height: 1.8rem;
        color: var(--text-secondary);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--orange);
        }
    }

    @media (max-width: 480px) {
        top: 2.4rem;
        right: 1.8rem;
    }
`;

export { ModalContent, ModalButtonClose };
