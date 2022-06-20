import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Product, SaleProduct, User } from '../../../@types';
import { PageContainer } from '../../../components';
import { SaleSteps, SectionAddProducts } from '../../../components/Sales';
import { getProductsServerSide, useProducts } from '../../../hooks/useProducts';
import { apiClient } from '../../../services/apiClient';
import { extractUserDataCookie } from '../../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { ContentRegisterSale, ContentRegisterSaleHeader } from './styles';

interface IRegisterSaleProps {
    loggedUser: User;
    products: Product[];
}

interface IResponse {
    next?: {
        page: number;
        limit: number;
    };
    previous?: {
        page: number;
        limit: number;
    };
    totalPage?: number;
    data?: Product[];
}

export default function RegisterSale({
    loggedUser,
    products,
}: IRegisterSaleProps) {
    const [listProducts, setListProducts] = useState<SaleProduct[]>([]);
    const [listSelectedProducts, setListSelectedProducts] = useState<
        SaleProduct[]
    >([]);

    async function fetchProducts({ pageParam = 1 }) {
        const { data } = await apiClient.get(
            `/products/${loggedUser.id_account}`,
            {
                params: {
                    page: pageParam,
                    limit: 10,
                },
            },
        );
        return data;
    }

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery<IResponse>('products', fetchProducts, {
        getNextPageParam: lastPage => {
            return lastPage.next?.page || undefined;
        },
    });

    useEffect(() => {
        if (data?.pages) {
            const formattedData = data?.pages?.flatMap(item => [
                ...(item.data as Product[]),
            ]);

            const products = formattedData.map(product => {
                const productExist = listSelectedProducts.find(
                    elem => elem.id === product.id,
                );

                return {
                    ...product,
                    amount: productExist ? productExist.amount : 0,
                };
            });
            setListProducts(products);
        }
    }, [data]);

    function updateListProducts(product: SaleProduct) {
        const newList = listProducts.map(elem => {
            if (elem.id === product.id) {
                return {
                    ...elem,
                    amount: product.amount,
                };
            }
            return elem;
        });
        setListProducts(newList);
    }

    const removeProductFromSelectedList = useCallback(
        (product: SaleProduct) => {
            const newList = listSelectedProducts.filter(
                elem => elem.id !== product.id,
            );
            setListSelectedProducts(newList);

            updateListProducts(product);
        },
        [listSelectedProducts, listProducts],
    );

    const addProductFromSelectedList = useCallback(
        (product: SaleProduct) => {
            const index = listSelectedProducts?.findIndex(
                elem => elem.id === product.id,
            );

            if (index >= 0) {
                const newListProducts = listSelectedProducts.map((elem, i) => {
                    return i === index
                        ? { ...elem, amount: product.amount }
                        : elem;
                });

                setListSelectedProducts(newListProducts);
            } else {
                setListSelectedProducts([...listSelectedProducts, product]);
            }

            updateListProducts(product);
        },
        [listSelectedProducts, listProducts],
    );

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentRegisterSale>
                    <ContentRegisterSaleHeader>
                        <h1>Cadastrar venda</h1>
                        <SaleSteps
                            currentStage={1}
                            updateStage={() => console.log('...')}
                        />
                    </ContentRegisterSaleHeader>

                    <SectionAddProducts
                        listProducts={listProducts}
                        funAddProduct={addProductFromSelectedList}
                        funRemoveProduct={removeProductFromSelectedList}
                    />
                </ContentRegisterSale>
            </>
        </PageContainer>
    );
}

export const getServerSideProps = withSSRAuth(async ctx => {
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    const products = await getProductsServerSide(user.id_account, ctx);

    return {
        props: {
            loggedUser: { ...user },
            products,
        },
    };
});
