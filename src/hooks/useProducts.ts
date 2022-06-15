import { GetServerSidePropsContext } from 'next';
import { useQuery, UseQueryResult } from 'react-query';

import { Product } from '../@types';
import { setupClient } from '../services/apiAuth';
import { apiClient } from '../services/apiClient';

interface IGetProductsResponse {
    products: Product[];
}

export async function getProducts(id_account: string): Promise<Product[]> {
    const { data } = await apiClient.get(`/products/${id_account}`);

    const products: Product[] = data.map((product: Product) => {
        return { ...product };
    });

    return products;
}

export async function getProductsServerSide(
    id_account: string,
    ctx: GetServerSidePropsContext,
): Promise<Product[]> {
    const api = setupClient(ctx);

    const { data } = await api.get(`/products/${id_account}`);

    const products: Product[] = data.map((product: Product) => {
        return { ...product };
    });

    return products;
}

export const useProducts = (
    id_account: string,
    data?: IGetProductsResponse,
) => {
    return useQuery(['products'], () => getProducts(id_account), {
        staleTime: 1000 * 60 * 10, // 10 minutes,
        initialData: data?.products,
    }) as UseQueryResult<Product[], unknown>;
};
