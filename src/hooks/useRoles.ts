import { GetServerSidePropsContext } from 'next';
import { useQuery, UseQueryResult } from 'react-query';

import { Role } from '../@types';
import { setupClient } from '../services/apiAuth';
import { apiClient } from '../services/apiClient';

export async function getRoles(id_account: string): Promise<Role[]> {
    const { data } = await apiClient.get(`/role/${id_account}`);

    const roles: Role[] = data.map((role: Role) => {
        return { ...role };
    });

    return roles;
}

export async function getRolesServerSide(
    id_account: string,
    ctx: GetServerSidePropsContext,
): Promise<Role[]> {
    const api = setupClient(ctx);

    const { data } = await api.get(`/role/${id_account}`);

    const roles: Role[] = data.map((role: Role) => {
        return { ...role };
    });

    return roles;
}

export const useRoles = (id_account: string) => {
    return useQuery(['roles'], () => getRoles(id_account), {
        staleTime: 1000 * 60 * 10, // 10 minutes,
    }) as UseQueryResult<Role[], unknown>;
};
