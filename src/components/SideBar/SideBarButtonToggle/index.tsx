import { useState } from 'react';

import { ButtonToggle } from './styles';

interface ISideBarButtonToggleProps {
    isActive: boolean;
    activateButtonToggle: (isActive: boolean) => void;
}

function SideBarButtonToggle({
    isActive,
    activateButtonToggle,
}: ISideBarButtonToggleProps) {
    return (
        <ButtonToggle
            isActive={isActive}
            onClick={() => activateButtonToggle(!isActive)}
        ></ButtonToggle>
    );
}

export { SideBarButtonToggle };
