import { GetServerSideProps } from 'next';
import { Plus } from 'phosphor-react';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { User } from '../../@types';
import {
    Button,
    FormRegisterUser,
    FormUpdateUser,
    ModalContainer,
    PageContainer,
    TableUsers,
} from '../../components';
import { FormDelete } from '../../components/Form/FormDelete';
import { getUsersServerSide, useUsers } from '../../hooks/useUsers';
import { apiClient } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';
import { extractUserDataCookie } from '../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { ContentUsers, ContentUsersHeader } from './styles';

interface IUsersProps {
    users: User[];
    loggedUser: User;
}

export default function Users({ loggedUser, users }: IUsersProps) {
    const [isOpenRegisterModal, setIsOpenRegisterModal] =
        useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
    const [userSelected, setUserSelected] = useState<User>({} as User);

    const { data, isLoading, isFetching, isError } = useUsers(
        loggedUser.id_account,
        {
            users,
        },
    );

    const deleteUser = useMutation(
        async (userId: string) => {
            const response = await apiClient.delete(`/users/${userId}`);
            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('users'),
        },
    );

    const closeModalRegister = useCallback(() => {
        setIsOpenRegisterModal(false);
    }, [isOpenRegisterModal]);

    const closeModalUpdate = useCallback(() => {
        setIsOpenUpdateModal(false);
    }, [isOpenUpdateModal]);

    const activeModalDelete = useCallback(
        (user: User) => {
            setUserSelected(user);
            setIsOpenDeleteModal(true);
        },
        [userSelected, isOpenDeleteModal],
    );

    const activeUpdateModal = useCallback(
        (user: User) => {
            setUserSelected(user);
            setIsOpenUpdateModal(true);
        },
        [userSelected, isOpenUpdateModal],
    );

    const handleDeleteUser = useCallback(
        async (userId: string) => {
            try {
                await deleteUser.mutateAsync(userId);
                toast.success('Usuário removido com sucesso');
                setIsOpenDeleteModal(false);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setUserSelected({} as User);
            }
        },
        [userSelected],
    );

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentUsers>
                    <ContentUsersHeader>
                        <h1>Usuários</h1>
                        <Button onClick={() => setIsOpenRegisterModal(true)}>
                            <>
                                <Plus />
                                <p>Adicionar usuário</p>
                            </>
                        </Button>
                    </ContentUsersHeader>
                    <TableUsers
                        headerContent={[
                            'Nome',
                            'Username',
                            'Cargo',
                            'E-mail',
                            'Telefone',
                        ]}
                        bodyContent={data as User[]}
                        funActiveModalDelete={activeModalDelete}
                        funActiveModalUpdate={activeUpdateModal}
                    />
                </ContentUsers>

                <ModalContainer
                    isOpen={isOpenRegisterModal}
                    funCloseModal={() => closeModalRegister()}
                >
                    <FormRegisterUser
                        funCloseModal={() => closeModalRegister()}
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenDeleteModal}
                    funCloseModal={() => setIsOpenDeleteModal(false)}
                >
                    <FormDelete
                        title="Excluir usuário"
                        subtitle="Tem certeza que deseja excluir esse usuário?"
                        funCancelButton={() => setIsOpenDeleteModal(false)}
                        funDeleteButton={() =>
                            handleDeleteUser(userSelected.id as string)
                        }
                    />
                </ModalContainer>

                <ModalContainer
                    isOpen={isOpenUpdateModal}
                    funCloseModal={() => closeModalUpdate()}
                >
                    <FormUpdateUser
                        user={userSelected}
                        funCloseModal={() => closeModalUpdate()}
                    />
                </ModalContainer>
            </>
        </PageContainer>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
    async ctx => {
        const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

        const users = await getUsersServerSide(user.id_account, ctx);

        return {
            props: {
                loggedUser: { ...user },
                users,
            },
        };
    },
    {
        role: 'admin',
    },
);
