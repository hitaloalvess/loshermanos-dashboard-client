import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface IInputFileContainerProps {
    error?: FieldError;
}

interface IInputFileLabelProps {
    error?: FieldError;
}

const InputFileContainer = styled.div<IInputFileContainerProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: ${props => (props.error ? `relative` : `static`)};
`;

const InputFileContent = styled.div`
    input[type='file'] {
        display: none;
    }
`;

const InputFileLabel = styled.label<IInputFileLabelProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 16rem;
    height: 13rem;
    border: ${props => (props.error ? `1px solid var(--red)` : `none`)};
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--dark-surface-primary);

    svg {
        width: 4.8rem;
        height: 4.8rem;
        color: ${props =>
            props.error ? `var(--red)` : `var(--text-secondary)`};
        margin-bottom: 1.2rem;
        &.iconAlert {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 2.4rem;
            height: 2.4rem;
        }
    }

    p {
        font-size: 1.4rem;
        text-align: center;
        font-weight: 500;
        color: ${props =>
            props.error ? `var(--red)` : `var(--text-secondary)`};
    }
`;

const ImgUpload = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
`;

const MessageError = styled.div`
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100%;
    text-align: center;
    p {
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--red);
    }
`;

export {
    InputFileContainer,
    InputFileContent,
    InputFileLabel,
    ImgUpload,
    MessageError,
};
