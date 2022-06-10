import { ReactElement } from 'react';

import { FormButtonContainer } from './styles';

interface IButtonContainer {
    children: ReactElement;
}

function FormButton({ children }: IButtonContainer) {
    return <FormButtonContainer type="submit">{children}</FormButtonContainer>;
}

export { FormButton };
