import { ReactElement } from 'react';

import { FormButtonContainer } from './styles';

interface IButtonContainer {
    funOnClick: () => void;
    children: ReactElement;
}

function FormButtonCancel({ funOnClick, children }: IButtonContainer) {
    return (
        <FormButtonContainer onClick={() => funOnClick()}>
            {children}
        </FormButtonContainer>
    );
}

export { FormButtonCancel };
