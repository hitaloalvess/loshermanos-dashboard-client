import decode from 'jwt-decode';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { IPayload, User } from '../@types';

interface IReturn {
    user: User;
}

export function extractUserDataCookie(
    nameToken: string,
    context?: GetServerSidePropsContext | undefined,
): IReturn {
    const cookies = parseCookies(context);
    const token = cookies[nameToken];

    try {
        const { name, email, username, telefone, admin, id_account } = decode(
            token,
        ) as IPayload;

        return {
            user: {
                name,
                email,
                username,
                telefone,
                admin,
                id_account,
            },
        };
    } catch {
        return { user: {} as User };
    }
}
