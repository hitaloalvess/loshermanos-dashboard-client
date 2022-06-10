import { WarningCircle } from 'phosphor-react';
import { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

import { FormInputContainer, InputMessageError } from './styles';

interface IFormInput {
    name: string;
    error?: FieldError;
    placeholder: string;
    type?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    children?: ReactElement;
}

const FormInputBase: ForwardRefRenderFunction<HTMLInputElement, IFormInput> = (
    {
        name,
        error,
        placeholder,
        type,
        defaultValue,
        disabled,
        children,
        ...rest
    }: IFormInput,
    ref,
) => {
    return (
        <FormInputContainer hasIcon={!!children} error={error}>
            {children}
            <input
                name={name}
                type={type || 'text'}
                defaultValue={defaultValue || ''}
                placeholder={placeholder}
                disabled={disabled}
                ref={ref}
                {...rest}
            />

            {!!error && <WarningCircle className="iconAlert" />}

            {!!error && (
                <InputMessageError>
                    <p>{error.message}</p>
                </InputMessageError>
            )}
        </FormInputContainer>
    );
};

export const FormInput = forwardRef(FormInputBase);
