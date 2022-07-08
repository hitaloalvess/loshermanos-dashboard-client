import { GetServerSideProps } from 'next';
import dynamic, { DynamicOptions } from 'next/dynamic';
import { Plus } from 'phosphor-react';
import { useCallback, useMemo, useState } from 'react';
import { useInfiniteQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Product, User } from '../../@types';
import {
    Button,
    FormDelete,
    FormRegisterProduct,
    FormUpdateProduct,
    ModalContainer,
    PageContainer,
} from '../../components';
import { IOnlyAdminAllowedProps } from '../../components/OnlyAdminAllowed';
import { ProductsList } from '../../components/ProductsList';
import { apiClient } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';
import { extractUserDataCookie } from '../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../utils/withSSRAuth';
import {
    ContentActions,
    ContentProducts,
    ContentProductsHeader,
} from './styles';

const OnlyAdminAllowed = dynamic<IOnlyAdminAllowedProps>(
    () =>
        import('../../components/OnlyAdminAllowed').then(
            ({ OnlyAdminAllowed }) => OnlyAdminAllowed,
        ),
    { ssr: false },
);

interface IProductsProps {
    loggedUser: User;
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

export default function Products({ loggedUser }: IProductsProps) {
    const [isOpenRegisterModal, setIsOpenRegisterModal] =
        useState<boolean>(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [productSelected, setProductSelected] = useState<Product>(
        {} as Product,
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

    const formattedData = useMemo(() => {
        const products = data?.pages?.flatMap(item => [
            ...(item.data as Product[]),
        ]);

        return products;
    }, [data]);

    const deleteProduct = useMutation(
        async (productId: string) => {
            const response = await apiClient.delete(`/products/${productId}`);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('products'),
        },
    );

    const handleDeleteProduct = useCallback(
        async (productId: string) => {
            try {
                await deleteProduct.mutateAsync(productId);
                toast.success('Usuário removido com sucesso');
                setIsOpenDeleteModal(false);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setProductSelected({} as Product);
            }
        },
        [productSelected],
    );

    const activeUpdateModal = useCallback(
        (product: Product) => {
            setProductSelected(product);
            setIsOpenUpdateModal(true);
        },
        [productSelected, isOpenUpdateModal],
    );

    const activeDeleteModal = useCallback(
        (product: Product) => {
            setProductSelected(product);
            setIsOpenDeleteModal(true);
        },
        [productSelected, isOpenDeleteModal],
    );

    const funCloseDeleteModal = useCallback(() => {
        setIsOpenDeleteModal(false);
        setProductSelected({} as Product);
    }, [isOpenDeleteModal, productSelected]);

    const funCloseUpdateModal = useCallback(() => {
        setIsOpenUpdateModal(false);
        setProductSelected({} as Product);
    }, [isOpenUpdateModal, productSelected]);

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentProducts>
                    <ContentProductsHeader>
                        <h1>Produtos</h1>

                        <OnlyAdminAllowed>
                            <Button
                                onClick={() => setIsOpenRegisterModal(true)}
                            >
                                <>
                                    <Plus />
                                    <p>Adicionar produto</p>
                                </>
                            </Button>
                        </OnlyAdminAllowed>
                    </ContentProductsHeader>
                    <ProductsList
                        products={formattedData as Product[]}
                        funUpdateProduct={activeUpdateModal}
                        funDeleteProduct={activeDeleteModal}
                    />

                    {hasNextPage && (
                        <ContentActions>
                            <Button
                                type="cancel"
                                onClick={() => fetchNextPage()}
                            >
                                <p> Ver mais </p>
                            </Button>
                        </ContentActions>
                    )}
                </ContentProducts>

                <ModalContainer
                    isOpen={isOpenRegisterModal}
                    funCloseModal={() => setIsOpenRegisterModal(false)}
                >
                    <FormRegisterProduct
                        funCloseModal={() => setIsOpenRegisterModal(false)}
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenUpdateModal}
                    funCloseModal={funCloseUpdateModal}
                >
                    <FormUpdateProduct
                        product={productSelected}
                        funCloseModal={funCloseUpdateModal}
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenDeleteModal}
                    funCloseModal={funCloseDeleteModal}
                    alignItemContainer="center"
                >
                    <FormDelete
                        title="Excluir produto"
                        subtitle="Tem certeza que deseja excluir esse produto?"
                        funCancelButton={funCloseDeleteModal}
                        funDeleteButton={() =>
                            handleDeleteProduct(productSelected.id as string)
                        }
                    />
                </ModalContainer>
            </>
        </PageContainer>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    return {
        props: {
            loggedUser: { ...user },
        },
    };
});
