import {
    PresentationChart,
    ShoppingBag,
    User,
    Package,
    Users,
} from 'phosphor-react';

import { SideBarItem } from '../SideBarItem';
import { SideBarListItemContainer } from './styles';

function SideBarListItem() {
    return (
        <SideBarListItemContainer>
            <SideBarItem href="/dashboard">
                <>
                    <PresentationChart />
                    <p>Dashboard</p>
                </>
            </SideBarItem>
            <SideBarItem href="/sales">
                <>
                    <ShoppingBag />
                    <p>Vendas</p>
                </>
            </SideBarItem>
            <SideBarItem href="/customers">
                <>
                    <User />
                    <p>Clientes</p>
                </>
            </SideBarItem>
            <SideBarItem href="/products">
                <>
                    <Package />
                    <p>Produtos</p>
                </>
            </SideBarItem>
            <SideBarItem href="/users">
                <>
                    <Users />
                    <p>Usuários</p>
                </>
            </SideBarItem>
        </SideBarListItemContainer>
    );
}

export { SideBarListItem };
