import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface IInputSelectProps {
    error?: FieldError;
}

const InputSelectContainer = styled.div<IInputSelectProps>`
    position: relative;

    select {
        width: 100%;
        padding: 1.6rem 2.4rem;
        color: var(--text-secondary);
        border: ${props =>
            props.error ? `3px solid var(--red)` : `3px solid transparent`};
        border-radius: 5px;
        appearance: none;
        background-color: var(--dark-surface-primary);

        &:hover,
        &:active,
        &:checked,
        &:focus {
            border-color: var(--orange);
            cursor: pointer;
            & + svg {
                color: var(--orange);
            }
        }
    }

    svg {
        position: absolute;
        top: 2rem;
        right: 2.4rem;
        width: 1.8rem;
        height: 1.8rem;
        color: var(--text-secondary);

        &.iconAlert {
            margin-left: auto;
            right: 4.8rem;
            color: var(--red);
        }
    }
`;

const InputSelectMessageError = styled.div`
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

const InputSelectLabel = styled.label`
    font-size: 1.2rem;
    color: var(--orange);
`;

export { InputSelectContainer, InputSelectMessageError, InputSelectLabel };
