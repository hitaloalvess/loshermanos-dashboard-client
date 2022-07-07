import { parseCookies } from 'nookies';
import { ReactElement } from 'react';

import { extractUserDataCookie } from '../../utils/extractUserDataCookie';

interface IOnlyAdminAllowed {
    children: ReactElement;
}
function OnlyAdminAllowed({ children }: IOnlyAdminAllowed) {
    const {
        user: { admin },
    } = extractUserDataCookie('@LosHermanosDash.token');

    if (!admin) {
        return null;
    }

    return <>{children}</>;
}

export { OnlyAdminAllowed };
