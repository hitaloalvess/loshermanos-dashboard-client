import { WarningCircle } from 'phosphor-react';
import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactElement,
    useEffect,
    useState,
} from 'react';
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import {
    FormInputSearchContainer,
    FormInputSearchDropdown,
    FormInputSearchDropdownRow,
    InputMessageError,
} from './styles';

interface IFormInputSearchProps<T, A> {
    items: T[];
    getItem: (item: T) => void;
    defaultValue?: string;
    placeholder: string;
    register: UseFormRegister<A>;
    setValue: UseFormSetValue<A>;
    error?: FieldError;
    children: ReactElement;
}

let firstRender = true;

function FormInputSearch({
    items,
    getItem,
    defaultValue,
    placeholder,
    error,
    register,
    setValue,
    children,
}: IFormInputSearchProps<any, any>) {
    const [inputValue, setInputValue] = useState<string>(defaultValue || '');
    const [activeDropDown, setActiveDropDown] = useState(true);
    useEffect(() => {
        setValue(register.name, inputValue);

        if (firstRender) {
            const item = items.find(i => {
                return i.name.toLowerCase() === inputValue.toLowerCase();
            });

            getItem(item);
            firstRender = false;
        }
    }, [inputValue]);

    const handleInputBlur = (name: string) => {
        const item = items.find(item => item.name === name);

        getItem(item);
    };

    return (
        <FormInputSearchContainer error={error} hasIcon={!!children}>
            {children}
            <input
                type="text"
                value={inputValue}
                placeholder={placeholder}
                {...register('customer', {
                    onChange: event => setInputValue(event.target.value),
                    onBlur: event => {
                        handleInputBlur(event.target.value);
                    },
                })}
                onFocus={() => setActiveDropDown(true)}
            />

            {activeDropDown && (
                <FormInputSearchDropdown>
                    {items
                        .filter(item => {
                            const searchItem = inputValue.toLowerCase();
                            const name = item.name.toLowerCase();

                            return (
                                searchItem &&
                                name.includes(searchItem) &&
                                name !== searchItem
                            );
                        })
                        .slice(0, 5)
                        .map(item => (
                            <FormInputSearchDropdownRow
                                key={item.id}
                                onClick={() => {
                                    getItem(item);
                                    setInputValue(item.name);
                                    setActiveDropDown(false);
                                }}
                            >
                                <p>{item.name}</p>
                            </FormInputSearchDropdownRow>
                        ))}
                </FormInputSearchDropdown>
            )}

            {!!error && <WarningCircle className="iconAlert" />}

            {!!error && (
                <InputMessageError>
                    <p>{error.message}</p>
                </InputMessageError>
            )}
        </FormInputSearchContainer>
    );
}

export { FormInputSearch };
