import router from 'next/router';
import { Plus } from 'phosphor-react';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Sale, User } from '../../@types';
import {
    Button,
    FormDelete,
    ModalContainer,
    PageContainer,
    PaymentForm,
} from '../../components';
import { TableSales } from '../../components/Tables/TableSales';
import { getSalesServerSide, useSales } from '../../hooks/useSales';
import { apiClient } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';
import { extractUserDataCookie } from '../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { ContentSales, ContentSalesHeader } from './styles';

interface ISalesProps {
    loggedUser: User;
    sales: Sale[];
}

export default function Sales({ loggedUser, sales }: ISalesProps) {
    const [isOpenPaymentModal, setIsOpenPaymentModal] =
        useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [saleSelected, setSaleSelected] = useState<Sale>({} as Sale);

    const { data, isLoading, isFetching, isError } = useSales(
        loggedUser.id_account,
        {
            sales,
        },
    );

    const activePaymentModal = useCallback(
        (sale: Sale) => {
            setIsOpenPaymentModal(true);
            setSaleSelected(sale);
        },
        [isOpenPaymentModal, saleSelected],
    );

    const funClosePaymentModal = useCallback(() => {
        setIsOpenPaymentModal(false);
        setSaleSelected({} as Sale);
    }, [saleSelected, isOpenPaymentModal]);

    const activeDeleteModal = useCallback(
        (sale: Sale) => {
            setIsOpenDeleteModal(true);
            setSaleSelected(sale);
        },
        [isOpenDeleteModal, saleSelected],
    );

    const funCloseDeleteModal = useCallback(() => {
        setIsOpenDeleteModal(false);
        setSaleSelected({} as Sale);
    }, [saleSelected, isOpenPaymentModal]);

    const deleteSale = useMutation(
        async (saleId: string) => {
            const response = await apiClient.delete(`/sales/${saleId}`);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('sales'),
        },
    );

    const handleDeleteSale = useCallback(
        async (saleId: string) => {
            try {
                await deleteSale.mutateAsync(saleId);
                toast.success('venda removida com sucesso');
                setIsOpenDeleteModal(false);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setSaleSelected({} as Sale);
            }
        },
        [saleSelected],
    );

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentSales>
                    <ContentSalesHeader>
                        <h1>Vendas</h1>

                        <Button onClick={() => router.push('/sales/register')}>
                            <>
                                <Plus />
                                <p>Adicionar venda</p>
                            </>
                        </Button>
                    </ContentSalesHeader>
                    <TableSales
                        headerContent={['Nome', 'Total', 'Status', 'Data']}
                        bodyContent={data as Sale[]}
                        userRole={loggedUser.role.name}
                        funActiveModalDelete={activeDeleteModal}
                        funUpdateSale={(saleId: string) =>
                            router.push(`/sales/update/${saleId}`)
                        }
                        funActiveModalPayment={activePaymentModal}
                    />
                </ContentSales>

                <ModalContainer
                    isOpen={isOpenPaymentModal}
                    funCloseModal={() => funClosePaymentModal()}
                >
                    <PaymentForm
                        sale={saleSelected}
                        funCloseModal={() => funClosePaymentModal()}
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenDeleteModal}
                    funCloseModal={() => funCloseDeleteModal()}
                    alignItemContainer="center"
                >
                    <FormDelete
                        title="Excluir venda"
                        subtitle="Tem certeza que deseja excluir essa venda?"
                        funCancelButton={() => funCloseDeleteModal()}
                        funDeleteButton={() =>
                            handleDeleteSale(saleSelected.id as string)
                        }
                    />
                </ModalContainer>
            </>
        </PageContainer>
    );
}

export const getServerSideProps = withSSRAuth(async ctx => {
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    const sales = await getSalesServerSide(user.id_account, ctx);

    return {
        props: {
            loggedUser: { ...user },
            sales,
        },
    };
});
