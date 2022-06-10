import { Plus } from 'phosphor-react';

import { InputFileContainer } from './styles';

interface IFormInputFileProps {
    name: string;
}

function FormInputFile({ name }: IFormInputFileProps) {
    return (
        <InputFileContainer>
            <div className="inputFile">
                <label htmlFor="file">
                    <>
                        <Plus />
                        <p>Adicione a imagem</p>
                    </>
                </label>
                <input
                    type="file"
                    name={name}
                    id="file"
                    onChange={() => console.log('Alterei')}
                />
            </div>
        </InputFileContainer>
    );
}

export { FormInputFile };
