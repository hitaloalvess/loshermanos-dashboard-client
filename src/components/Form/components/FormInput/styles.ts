import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface IFormInputContainerProps {
    hasIcon?: boolean;
    error?: FieldError;
    disabled?: boolean;
}

const FormInputContainer = styled.div<IFormInputContainerProps>`
    position: relative;
    display: ${props => (props.disabled ? 'none' : 'flex')};
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

        &.iconAlert {
            margin-left: auto;
            right: 2.4rem;
            color: var(--red);
        }
    }

    input {
        width: 100%;
        height: 100%;
        padding: ${props =>
            props.hasIcon ? `1.6rem 5.2rem` : `1.6rem 2.4rem`};
        border: 3px solid transparent;
        border: ${props =>
            props.error ? `3px solid var(--red)` : `3px solid transparent`};
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

const InputMessageError = styled.div`
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    p {
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--red);
    }
`;

export { FormInputContainer, InputMessageError };
