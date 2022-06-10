import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Role, User } from '../../../../@types';
import { useRoles } from '../../../../hooks/useRoles';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { FormButton } from '../../components/FormButton';
import { FormInput } from '../../components/FormInput';
import { FormInputSelect } from '../../components/FormInputSelect';
import {
    FormRegisterUserContainer,
    FormRegisterUserRow,
    FormRegisterUserTitle,
} from './styles';

interface IUpdateUserFormData {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    telefone: string;
    id_role: string;
    id_account?: string;
}

interface IFormRegisterProps {
    user: User;
    funCloseModal: () => void;
}

const updateUserFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    username: yup.string().required('Username é obrigatório'),
    email: yup
        .string()
        .required('E-mail é obrigatório')
        .email('E-mail inválido'),
    telefone: yup.string().required('Telefone é obrigatório'),
    id_role: yup.string().required('Cargo é obrigatório'),
});

function FormUpdateUser({ user, funCloseModal }: IFormRegisterProps) {
    const { data } = useRoles(user.id_account);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateUserFormData>({
        resolver: yupResolver(updateUserFormSchema),
    });

    const update = useMutation(
        async ({
            name,
            email,
            username,
            id_role,
            telefone,
        }: IUpdateUserFormData) => {
            const response = await apiClient.put(`/users/${user.id}`, {
                name,
                email,
                username,
                password: user.password,
                telefone,
                id_role,
                id_account: user.id_account,
            });

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('users'),
        },
    );

    const handleUpdateUser: SubmitHandler<
        IUpdateUserFormData
    > = async values => {
        try {
            await update.mutateAsync(values);
            toast.success('Usuário atualizado com sucesso!');
            router.push('/users');
            funCloseModal();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <FormRegisterUserContainer>
            <FormRegisterUserTitle>Atualizar usuário</FormRegisterUserTitle>

            <form onSubmit={handleSubmit(handleUpdateUser)}>
                <FormRegisterUserRow countItens={2}>
                    <FormInput
                        defaultValue={user.name}
                        placeholder="Nome"
                        error={errors.name}
                        {...register('name')}
                    />
                    <FormInput
                        defaultValue={user.username}
                        placeholder="Username"
                        error={errors.username}
                        {...register('username')}
                    />
                </FormRegisterUserRow>

                <FormRegisterUserRow countItens={1}>
                    <FormInput
                        defaultValue={user.email}
                        type="email"
                        placeholder="E-mail"
                        error={errors.email}
                        {...register('email')}
                    />
                </FormRegisterUserRow>

                <FormRegisterUserRow countItens={2}>
                    <FormInputSelect
                        defaultValue={user.role.id}
                        options={data as Role[]}
                        error={errors.id_role}
                        {...register('id_role')}
                    />

                    <FormInput
                        defaultValue={user.telefone}
                        placeholder="Telefone"
                        error={errors.telefone}
                        {...register('telefone')}
                    />
                </FormRegisterUserRow>

                <FormButton>
                    <p>Atualizar</p>
                </FormButton>
            </form>
        </FormRegisterUserContainer>
    );
}

export { FormUpdateUser };
