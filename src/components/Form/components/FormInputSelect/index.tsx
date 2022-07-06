import { CaretDown, WarningCircle } from 'phosphor-react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
    InputSelectContainer,
    InputSelectLabel,
    InputSelectMessageError,
} from './styles';

interface IFormInputSelect {
    error?: FieldError;
    defaultValue?: string;
}

const FormInputSelectBase: ForwardRefRenderFunction<
    HTMLSelectElement,
    IFormInputSelect
> = ({ error, defaultValue, ...rest }: IFormInputSelect, ref) => {
    return (
        <InputSelectContainer error={error}>
            <select defaultValue={defaultValue} ref={ref} {...rest}>
                <option value="">Usuário é admin?</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
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
