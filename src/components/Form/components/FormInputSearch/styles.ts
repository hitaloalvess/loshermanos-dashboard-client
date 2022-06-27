import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface IFormInputSearchContainerProps {
    error?: FieldError;
    hasIcon?: boolean;
}

const FormInputSearchContainer = styled.div<IFormInputSearchContainerProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    background-color: var(--dark-surface-primary);

    svg {
        position: absolute;
        top: 2rem;
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

const FormInputSearchDropdown = styled.ul`
    position: absolute;
    top: 6rem;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: none;
    background-color: var(--dark-secondary-hover);
    z-index: 1;
`;

const FormInputSearchDropdownRow = styled.li`
    cursor: pointer;
    padding: 0.8rem 2.4rem;
    text-align: start;
    margin: 2px 0;
    color: var(--white);

    &:nth-child(2n + 2) {
        background-color: var(--dark-surface-primary);
    }

    &:first-child {
        border-radius: 5px 5px 0 0;
    }

    &:last-child {
        border-radius: 0 0 5px 5px;
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

export {
    FormInputSearchContainer,
    FormInputSearchDropdown,
    FormInputSearchDropdownRow,
    InputMessageError,
};
