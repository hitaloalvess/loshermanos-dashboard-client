import { WarningCircle } from 'phosphor-react';
import { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';

import { FormRadioGroupContainer, FormRadioButtonMessageError } from './styles';

interface IFormRadioButtonProps {
    title?: string;
    error?: FieldError;
    children: ReactElement;
}

const FormRadioGroupBase: ForwardRefRenderFunction<
    HTMLInputElement,
    IFormRadioButtonProps
> = ({ title, error, children }: IFormRadioButtonProps, ref) => {
    return (
        <FormRadioGroupContainer error={error} ref={ref}>
            {!!error && (
                <FormRadioButtonMessageError>
                    <WarningCircle className="iconAlert" />

                    <p>{error.message}</p>
                </FormRadioButtonMessageError>
            )}

            {children}
        </FormRadioGroupContainer>
    );
};

export const FormRadioGroup = forwardRef(FormRadioGroupBase);
