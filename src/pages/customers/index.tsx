import { GetServerSideProps } from 'next';
import { Plus } from 'phosphor-react';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Customer, User } from '../../@types';
import {
    Button,
    FormDelete,
    FormRegisterCustomer,
    FormUpdateCustomer,
    ModalContainer,
    PageContainer,
} from '../../components';
import { TableCustomers } from '../../components/Tables/TableCustomers';
import { getCustomersServerSide, useCustomers } from '../../hooks/useCustomers';
import { apiClient } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';
import { extractUserDataCookie } from '../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { ContentCustomers, ContentCustomersHeader } from './styles';

interface ICustomers {
    customers: Customer[];
    loggedUser: User;
}

export default function Customers({ customers, loggedUser }: ICustomers) {
    const [isOpenRegisterModal, setIsOpenRegisterModal] =
        useState<boolean>(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [customerSelected, setCustomerSelected] = useState<Customer>(
        {} as Customer,
    );

    const { data, isLoading, isFetching, isError } = useCustomers(
        loggedUser.id_account,
        {
            customers,
        },
    );

    const deleteCustomer = useMutation(
        async (userId: string) => {
            const response = await apiClient.delete(`/customers/${userId}`);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('customers'),
        },
    );

    const activeDeleteModal = useCallback(
        (customer: Customer) => {
            setCustomerSelected(customer);
            setIsOpenDeleteModal(true);
        },
        [customerSelected, isOpenDeleteModal],
    );

    const activeUpdateModal = useCallback(
        (customer: Customer) => {
            setCustomerSelected(customer);
            setIsOpenUpdateModal(true);
        },
        [customerSelected, isOpenUpdateModal],
    );

    const handleDeleteCustomer = useCallback(
        async (userId: string) => {
            try {
                await deleteCustomer.mutateAsync(userId);
                toast.success('Cliente removido com sucesso');
                setIsOpenDeleteModal(false);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setCustomerSelected({} as Customer);
            }
        },
        [customerSelected],
    );

    const closeModalRegister = useCallback(() => {
        setIsOpenRegisterModal(false);
        setCustomerSelected({} as Customer);
    }, [isOpenRegisterModal, customerSelected]);

    const funCloseDeleteModal = useCallback(() => {
        setIsOpenDeleteModal(false);
        setCustomerSelected({} as Customer);
    }, [isOpenDeleteModal, customerSelected]);

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentCustomers>
                    <ContentCustomersHeader>
                        <h1>Clientes</h1>
                        <Button onClick={() => setIsOpenRegisterModal(true)}>
                            <>
                                <Plus />
                                <p>Adicionar cliente</p>
                            </>
                        </Button>
                    </ContentCustomersHeader>
                    <TableCustomers
                        headerContent={['Nome', 'Endereço', 'Telefone', 'Data']}
                        bodyContent={data as Customer[]}
                        admin={loggedUser.admin}
                        funActiveModalDelete={activeDeleteModal}
                        funActiveModalUpdate={activeUpdateModal}
                    />
                </ContentCustomers>

                <ModalContainer
                    isOpen={isOpenRegisterModal}
                    funCloseModal={() => closeModalRegister()}
                >
                    <FormRegisterCustomer
                        funCloseModal={() => closeModalRegister()}
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenUpdateModal}
                    funCloseModal={() => setIsOpenUpdateModal(false)}
                >
                    <FormUpdateCustomer
                        customer={customerSelected}
                        funCloseModal={() => setIsOpenUpdateModal(false)}
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenDeleteModal}
                    funCloseModal={() => setIsOpenDeleteModal(false)}
                    alignItemContainer="center"
                >
                    <FormDelete
                        title="Excluir cliente"
                        subtitle="Tem certeza que deseja excluir esse cliente?"
                        funCancelButton={funCloseDeleteModal}
                        funDeleteButton={() =>
                            handleDeleteCustomer(customerSelected.id as string)
                        }
                    />
                </ModalContainer>
            </>
        </PageContainer>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    const customers = await getCustomersServerSide(user.id_account, ctx);

    return {
        props: {
            loggedUser: { ...user },
            customers,
        },
    };
});
