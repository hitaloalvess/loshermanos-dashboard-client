import { useCallback, useState } from 'react';

import { SideBarButtonLogout } from './SideBarButtonLogout';
import { SideBarButtonToggle } from './SideBarButtonToggle';
import { SideBarListItem } from './SideBarListItem';
import { SideBarContainer } from './styles';

function SideBar() {
    const [isToggleActive, setIsToggleActive] = useState(false);

    const activateToggle = useCallback(
        (isActive: boolean) => {
            setIsToggleActive(isActive);
        },
        [isToggleActive],
    );

    return (
        <SideBarContainer>
            <SideBarButtonToggle
                isActive={isToggleActive}
                activateButtonToggle={activateToggle}
            />
            <SideBarListItem showMenu={isToggleActive} />
        </SideBarContainer>
    );
}

export { SideBar };
