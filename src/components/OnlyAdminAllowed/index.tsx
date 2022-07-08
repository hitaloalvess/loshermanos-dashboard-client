import { parseCookies } from 'nookies';
import { ReactElement } from 'react';

import { extractUserDataCookie } from '../../utils/extractUserDataCookie';

export interface IOnlyAdminAllowedProps {
    children: ReactElement;
}
function OnlyAdminAllowed({ children }: IOnlyAdminAllowedProps) {
    const {
        user: { admin },
    } = extractUserDataCookie('@LosHermanosDash.token');

    if (!admin) {
        return <></>;
    }

    return <>{children}</>;
}

export { OnlyAdminAllowed };
