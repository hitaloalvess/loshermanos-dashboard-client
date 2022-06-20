import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Product, SaleProduct, User } from '../../../@types';
import { PageContainer } from '../../../components';
import { SaleSteps, SectionAddProducts } from '../../../components/Sales';
import { SectionMyCart } from '../../../components/Sales/SectionMyCart';
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
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [listProducts, setListProducts] = useState<SaleProduct[]>([]);
    const [listSelectedProducts, setListSelectedProducts] = useState<
        SaleProduct[]
    >([
        {
            id: 'asdaslçdkew',
            description: 'Pizza de Calabresa',
            price: 40.0,
            image_name:
                '155c4b432e8f888a0327b771d825d35b-Pizza-de-calabresa.jpg',
            id_account: '52981da9-8f82-49f3-aee4-f00c5aa492a2',
            amount: 2,
        },
        {
            id: 'asdaslçdkewss',
            description: 'Pizza de Calabresa',
            price: 40.0,
            image_name:
                '155c4b432e8f888a0327b771d825d35b-Pizza-de-calabresa.jpg',
            id_account: '52981da9-8f82-49f3-aee4-f00c5aa492a2',
            amount: 2,
        },
    ]);

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

    const totalSale = useMemo(() => {
        const total = listSelectedProducts.reduce((total, product) => {
            return total + product.price * product.amount;
        }, 0);

        return total;
    }, [listSelectedProducts]);

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

    const updateStage = useCallback(
        (currentStage: number) => {
            if (currentStage === 2 && listSelectedProducts.length <= 0) {
                toast.error('Adicione um produto a lista de venda!');
                return;
            }

            setCurrentStage(currentStage);
        },
        [listSelectedProducts, currentStage],
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

                    {/* <SectionAddProducts
                        listProducts={listProducts}
                        funAddProduct={addProductFromSelectedList}
                        funRemoveProduct={removeProductFromSelectedList}
                    /> */}

                    {/* <SectionMyCart
                        listProducts={listSelectedProducts}
                        totalSale={totalSale}
                        updateStage={updateStage}
                        increaseProduct={addProductFromSelectedList}
                        decreaseProduct={removeProductFromSelectedList}
                    /> */}
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
