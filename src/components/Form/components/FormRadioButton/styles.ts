import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface IFormRadioButtonLabelProps {
    value: 'PAID_OUT' | 'PENDING';
    error?: FieldError;
}

const typeButtonColor = {
    PAID_OUT: `var(--green)`,
    PENDING: `var(--orange)`,
};

const FormRadioButtonContainer = styled.div``;

const FormRadioButtonLabel = styled.label<IFormRadioButtonLabelProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 0.8rem;
    padding: 1.8rem 0;
    border-radius: 6px;
    border: ${props =>
        props.error ? `3px solid var(--red)` : `3px solid transparent`};
    background-color: var(--dark-surface-primary);
    transition: border 0.2s ease-in-out;

    svg {
        width: 2rem;
        height: 2rem;
        color: ${props => typeButtonColor[props.value]};
    }
    p {
        display: inline-block;
    }
`;

const FormRadioButtonInput = styled.input`
    display: none;
    &:checked {
        & + label {
            border: 3px solid var(--orange);
        }
    }
`;

export { FormRadioButtonContainer, FormRadioButtonLabel, FormRadioButtonInput };
