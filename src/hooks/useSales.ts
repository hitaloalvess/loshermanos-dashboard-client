import { GetServerSidePropsContext } from 'next';
import { useQuery, UseQueryResult } from 'react-query';

import { Sale } from '../@types';
import { setupClient } from '../services/apiAuth';
import { apiClient } from '../services/apiClient';

interface IGetCustomersResponse {
    sales: Sale[];
}

export async function getSales(id_account: string): Promise<Sale[]> {
    const { data } = await apiClient.get(`/sales/all/${id_account}`);

    const sales: Sale[] = data.map((sale: Sale) => {
        return { ...sale };
    });

    return sales;
}

export async function getSalesByIdServerSide(
    id_sale: string,
    ctx: GetServerSidePropsContext,
): Promise<Sale> {
    const api = setupClient(ctx);

    const { data } = await api.get(`/sales/${id_sale}`);

    return data;
}

export async function getSalesServerSide(
    id_account: string,
    ctx: GetServerSidePropsContext,
): Promise<Sale[]> {
    const api = setupClient(ctx);

    const { data } = await api.get(`/sales/all/${id_account}`);

    const sales: Sale[] = data.map((sale: Sale) => {
        return { ...sale };
    });

    return sales;
}

export const useSales = (id_account: string, data?: IGetCustomersResponse) => {
    return useQuery(['sales'], () => getSales(id_account), {
        staleTime: 1000 * 60 * 10, // 10 minutes,
        initialData: data?.sales,
    }) as UseQueryResult<Sale[], unknown>;
};
