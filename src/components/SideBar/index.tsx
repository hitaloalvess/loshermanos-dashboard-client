import { SideBarButtonLogout } from './SideBarButtonLogout';
import { SideBarListItem } from './SideBarListItem';
import { SideBarContainer } from './styles';

function SideBar() {
    return (
        <SideBarContainer>
            <SideBarListItem />
            <SideBarButtonLogout />
        </SideBarContainer>
    );
}

export { SideBar };
