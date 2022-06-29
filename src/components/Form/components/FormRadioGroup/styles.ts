import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface IFormRadioButtonContainerProps {
    error?: FieldError;
}

const FormRadioGroupContainer = styled.div<IFormRadioButtonContainerProps>`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 0 2rem;
`;

const FormRadioButtonMessageError = styled.span`
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    display: flex;
    p {
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--red);
    }

    svg {
        width: 2rem;
        height: 2rem;
        color: var(--red);
    }
`;

export { FormRadioGroupContainer, FormRadioButtonMessageError };
