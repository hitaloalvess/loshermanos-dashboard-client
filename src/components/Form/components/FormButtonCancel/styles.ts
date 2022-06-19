import styled from 'styled-components';

const FormButtonContainer = styled.button`
    width: 100%;
    padding: 1.6rem 0;
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    border: none;
    border-radius: 5px;
    color: var(--white);
    background-color: var(--dark-surface-primary);
    transition: filter 0.3s ease-in-out;

    &:hover {
        filter: brightness(1.2);
    }
`;

export { FormButtonContainer };
