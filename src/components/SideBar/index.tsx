import { useCallback, useState } from 'react';

import { SideBarButtonToggle } from './SideBarButtonToggle';
import { SideBarListItem } from './SideBarListItem';
import { SideBarContainer } from './styles';

function SideBar() {
    const [isToggleActive, setIsToggleActive] = useState(false);

    const activateToggle = useCallback((isActive: boolean) => {
        setIsToggleActive(isActive);
    }, []);

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
