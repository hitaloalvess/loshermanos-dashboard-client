import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import {
    CurvedEdge,
    SideBarItemBackground,
    SideBarItemContainer,
    SideBarItemLink,
    SideBarItemSelector,
} from './styles';

interface ISideBarLinkProps {
    href: string;
    children: ReactElement;
}

function SideBarItem({ href, children }: ISideBarLinkProps) {
    const router = useRouter();
    const isRoute = router.asPath.includes(href);

    return (
        <SideBarItemContainer>
            {isRoute && <CurvedEdge curvedEdgeSide="top" />}
            <SideBarItemBackground>
                {isRoute && <SideBarItemSelector />}
                <Link href={href}>
                    <SideBarItemLink linkActive={isRoute && true}>
                        {children}
                    </SideBarItemLink>
                </Link>
            </SideBarItemBackground>
            {isRoute && <CurvedEdge curvedEdgeSide="bottom" />}
        </SideBarItemContainer>
    );
}

export { SideBarItem };
