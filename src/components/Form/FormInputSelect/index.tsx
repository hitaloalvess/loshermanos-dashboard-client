import { CaretDown } from 'phosphor-react';

import { InputSelectContainer } from './styles';

type Option = {
    id: string;
    name: string;
    description: string;
};

interface IFormInputSelect {
    options: Option[];
}

function FormInputSelect({ options }: IFormInputSelect) {
    return (
        <InputSelectContainer>
            <select>
                {options.map(option => (
                    <option key={option.id} id={option.name}>
                        {option.description}
                    </option>
                ))}
            </select>

            <CaretDown />
        </InputSelectContainer>
    );
}

export { FormInputSelect };
