import { GetServerSidePropsContext } from 'next';
import { useQuery, UseQueryResult } from 'react-query';

import { Customer } from '../@types';
import { setupClient } from '../services/apiAuth';
import { apiClient } from '../services/apiClient';

interface IGetCustomersResponse {
    customers: Customer[];
}

export async function getCustomers(id_account: string): Promise<Customer[]> {
    const { data } = await apiClient.get(`/customers/${id_account}`);

    const customers: Customer[] = data.map((customer: Customer) => {
        return { ...customer };
    });

    return customers;
}

export async function getCustomersServerSide(
    id_account: string,
    ctx: GetServerSidePropsContext,
): Promise<Customer[]> {
    const api = setupClient(ctx);

    const { data } = await api.get(`/customers/${id_account}`);

    const customers: Customer[] = data.map((customer: Customer) => {
        return { ...customer };
    });

    return customers;
}

export const useCustomers = (
    id_account: string,
    data?: IGetCustomersResponse,
) => {
    return useQuery(['customers'], () => getCustomers(id_account), {
        staleTime: 1000 * 60 * 10, // 10 minutes,
        initialData: data?.customers,
    }) as UseQueryResult<Customer[], unknown>;
};
