import styled from 'styled-components';

const ModalContent = styled.dialog`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4.4rem 12.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: none;
    border-radius: 5px;
    background-color: var(--background);
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
`;

export { ModalContent, ModalButtonClose };
