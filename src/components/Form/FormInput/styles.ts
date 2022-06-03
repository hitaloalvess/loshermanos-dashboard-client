import styled from 'styled-components';

interface IFormInputContainerProps {
    hasIcon?: boolean;
}

const FormInputContainer = styled.div<IFormInputContainerProps>`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    background-color: var(--dark-surface-primary);

    svg {
        position: absolute;
        left: 1.6rem;
        width: 2rem;
        height: 2rem;
        color: var(--text-secondary);
    }

    input {
        width: 100%;
        height: 100%;
        padding: ${props =>
            props.hasIcon ? `1.6rem 5.2rem` : `1.6rem 2.4rem`};
        border: 3px solid transparent;
        border-radius: 5px;
        outline: none;
        font-size: 1.6rem;
        font-family: 'Roboto Slab', sans-serif;
        color: var(--white);
        background-color: transparent;
        transition: border-color 0.3s ease;
        &:focus {
            border-color: var(--orange);
        }
    }
`;

export { FormInputContainer };
