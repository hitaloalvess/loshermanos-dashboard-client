import { ReactElement } from 'react';

import { ButtonContainer } from './styles';

interface IButtonProps {
    type: 'edit' | 'delete' | 'payment';
    onClick: (id?: string) => void;
    children: ReactElement;
}

function Button({ type, onClick, children }: IButtonProps) {
    return (
        <ButtonContainer onClick={() => onClick()} typeButton={type}>
            {children}
        </ButtonContainer>
    );
}

export { Button };
