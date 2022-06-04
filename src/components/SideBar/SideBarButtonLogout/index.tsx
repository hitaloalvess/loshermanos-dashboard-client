import { SignOut } from 'phosphor-react';
import { useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContexts';
import { SideBarButtonLogoutContainer } from './styles';

function SideBarButtonLogout() {
    const { signOut } = useContext(AuthContext);

    return (
        <SideBarButtonLogoutContainer onClick={() => signOut()}>
            <>
                <SignOut />
                <p>Sair</p>
            </>
        </SideBarButtonLogoutContainer>
    );
}

export { SideBarButtonLogout };
