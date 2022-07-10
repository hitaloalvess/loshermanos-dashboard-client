import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Customer, Product, User } from '../../../@types';
import { PageContainer } from '../../../components';
import {
    SaleInformationSection,
    SaleSteps,
    SectionAddProducts,
} from '../../../components/Sales';
import { SectionMyCart } from '../../../components/Sales/SectionMyCart';
import { getCustomersServerSide } from '../../../hooks/useCustomers';
import { getProductsServerSide, useProducts } from '../../../hooks/useProducts';
import { apiClient } from '../../../services/apiClient';
import { extractUserDataCookie } from '../../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { ContentRegisterSale, ContentRegisterSaleHeader } from './styles';

interface IRegisterSaleProps {
    loggedUser: User;
    products: Product[];
    customers: Customer[];
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
    customers,
}: IRegisterSaleProps) {
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [listProducts, setListProducts] = useState<Product[]>([]);
    const [listSelectedProducts, setListSelectedProducts] = useState<Product[]>(
        [],
    );

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
    }, [data, listSelectedProducts]);

    const totalSale = useMemo(() => {
        const total = listSelectedProducts.reduce((total, product) => {
            return total + product.price * Number(product.amount);
        }, 0);

        return total;
    }, [listSelectedProducts]);

    const updateListProducts = useCallback(
        (product: Product) => {
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
        },
        [listProducts],
    );

    const removeProductFromSelectedList = useCallback(
        (product: Product) => {
            const newList = listSelectedProducts.filter(
                elem => elem.id !== product.id,
            );
            setListSelectedProducts(newList);

            updateListProducts(product);
        },
        [listSelectedProducts, updateListProducts],
    );

    const addProductFromSelectedList = useCallback(
        (product: Product) => {
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
        [listSelectedProducts, updateListProducts],
    );

    const updateStage = useCallback(
        (currentStage: number) => {
            if (currentStage > 1 && listSelectedProducts.length <= 0) {
                toast.error('Adicione um produto a lista de venda!');
                return;
            }

            setCurrentStage(currentStage);
        },
        [listSelectedProducts],
    );

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentRegisterSale>
                    <ContentRegisterSaleHeader>
                        <h1>Cadastrar venda</h1>
                        <SaleSteps currentStage={currentStage} />
                    </ContentRegisterSaleHeader>

                    {currentStage === 1 && (
                        <SectionAddProducts
                            listProducts={listProducts}
                            totalSale={totalSale}
                            funAddProduct={addProductFromSelectedList}
                            funRemoveProduct={removeProductFromSelectedList}
                            updateStage={updateStage}
                        />
                    )}

                    {currentStage === 2 && (
                        <SectionMyCart
                            listProducts={listSelectedProducts}
                            totalSale={totalSale}
                            updateStage={updateStage}
                            increaseProduct={addProductFromSelectedList}
                            decreaseProduct={removeProductFromSelectedList}
                        />
                    )}

                    {currentStage === 3 && (
                        <SaleInformationSection
                            customers={customers}
                            totalSale={totalSale}
                            saleProducts={listSelectedProducts}
                            updateStage={updateStage}
                        />
                    )}
                </ContentRegisterSale>
            </>
        </PageContainer>
    );
}

export const getServerSideProps = withSSRAuth(async ctx => {
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    const products = await getProductsServerSide(user.id_account, ctx);

    const customers = await getCustomersServerSide(user.id_account, ctx);
    return {
        props: {
            loggedUser: { ...user },
            products,
            customers,
        },
    };
});
