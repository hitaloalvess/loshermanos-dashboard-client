import { CaretDown, WarningCircle } from 'phosphor-react';
import { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { InputSelectContainer, InputSelectMessageError } from './styles';

type Option = {
    id: string;
    name: string;
    description: string;
};

interface IFormInputSelect {
    options: Option[];
    error?: FieldError;
    defaultValue?: string;
}

const FormInputSelectBase: ForwardRefRenderFunction<
    HTMLSelectElement,
    IFormInputSelect
> = ({ options, error, defaultValue, ...rest }: IFormInputSelect, ref) => {
    return (
        <InputSelectContainer error={error}>
            <select defaultValue={defaultValue} ref={ref} {...rest}>
                {!defaultValue && <option value="">Selecione o cargo</option>}
                {options &&
                    options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.description}
                        </option>
                    ))}
            </select>

            <CaretDown />

            {!!error && <WarningCircle className="iconAlert" />}

            {!!error && (
                <InputSelectMessageError>
                    <p>{error.message}</p>
                </InputSelectMessageError>
            )}
        </InputSelectContainer>
    );
};

export const FormInputSelect = forwardRef(FormInputSelectBase);
