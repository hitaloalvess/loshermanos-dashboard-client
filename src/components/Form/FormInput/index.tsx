import { ReactElement } from 'react';

import { FormInputContainer } from './styles';

interface IFormInput {
    name: string;
    placeholder: string;
    type?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    children?: ReactElement;
}

function FormInput({
    name,
    placeholder,
    type,
    defaultValue,
    disabled,
    children,
    ...rest
}: IFormInput) {
    return (
        <FormInputContainer hasIcon={!!children}>
            {children}
            <input
                name={name}
                type={type || 'text'}
                defaultValue={defaultValue || ''}
                placeholder={placeholder}
                disabled={disabled}
                {...rest}
            />
        </FormInputContainer>
    );
}

export { FormInput };
