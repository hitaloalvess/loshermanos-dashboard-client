import { GetServerSidePropsContext } from 'next';
import { useQuery, UseQueryResult } from 'react-query';

import { User } from '../@types';
import { setupClient } from '../services/apiAuth';
import { apiClient } from '../services/apiClient';

interface IGetUsersResponse {
    users: User[];
}

export async function getUsers(id_account: string): Promise<User[]> {
    const { data } = await apiClient.get(`/users/${id_account}`);

    const users: User[] = data.map((user: User) => {
        return { ...user };
    });

    return users;
}

export async function getUsersServerSide(
    id_account: string,
    ctx: GetServerSidePropsContext,
): Promise<User[]> {
    const api = setupClient(ctx);

    const { data } = await api.get(`/users/${id_account}`);

    const users: User[] = data.map((user: User) => {
        return { ...user };
    });

    return users;
}

export const useUsers = (id_account: string, data?: IGetUsersResponse) => {
    return useQuery(['users'], () => getUsers(id_account), {
        staleTime: 1000 * 60 * 10, // 10 minutes,
        initialData: data?.users,
    }) as UseQueryResult<User[], unknown>;
};
