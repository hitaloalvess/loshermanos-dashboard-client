import { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

import {
    FormRadioButtonContainer,
    FormRadioButtonInput,
    FormRadioButtonLabel,
} from './styles';

interface IFormRadioButtonProps {
    id: string;
    name: string;
    value: 'PAID_OUT' | 'PENDING';
    error?: FieldError;
    defaultValue?: string;
    children: ReactElement;
}

const FormRadioButtonBase: ForwardRefRenderFunction<
    HTMLInputElement,
    IFormRadioButtonProps
> = (
    {
        id,
        name,
        value,
        error,
        defaultValue,
        children,
        ...rest
    }: IFormRadioButtonProps,
    ref,
) => {
    return (
        <FormRadioButtonContainer>
            <FormRadioButtonInput
                type="radio"
                id={id}
                name={name}
                value={value}
                ref={ref}
                defaultChecked={defaultValue === value}
                {...rest}
            />

            <FormRadioButtonLabel error={error} value={value} htmlFor={id}>
                {children}
            </FormRadioButtonLabel>
        </FormRadioButtonContainer>
    );
};

export const FormRadioButton = forwardRef(FormRadioButtonBase);
