import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import router from 'next/router';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Role } from '../../../@types';
import { AuthContext } from '../../../contexts/AuthContexts';
import { useRoles } from '../../../hooks/useRoles';
import { apiClient } from '../../../services/apiClient';
import { queryClient } from '../../../services/queryClient';
import { FormButton } from '../FormButton';
import { FormInput } from '../FormInput';
import { FormInputSelect } from '../FormInputSelect';
import {
    FormRegisterUserContainer,
    FormRegisterUserRow,
    FormRegisterUserTitle,
} from './styles';

interface IRegisterUserFormData {
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
    funCloseModal: () => void;
}

const registerUserFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    username: yup.string().required('Username é obrigatório'),
    email: yup
        .string()
        .required('E-mail é obrigatório')
        .email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
    password_confirmation: yup
        .string()
        .oneOf([null, yup.ref('password')], 'As senhas devem ser iguais'),
    telefone: yup.string().required('Telefone é obrigatório'),
    id_role: yup.string().required('Cargo é obrigatório'),
});

function FormRegisterUser({ funCloseModal }: IFormRegisterProps) {
    const { user } = useContext(AuthContext);

    const { data } = useRoles(user.id_account);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterUserFormData>({
        resolver: yupResolver(registerUserFormSchema),
    });

    const create = useMutation(
        async ({
            name,
            email,
            username,
            password,
            id_role,
            telefone,
        }: IRegisterUserFormData) => {
            const response = await apiClient.post('/users', {
                name,
                email,
                username,
                password,
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

    const handleRegisterUser: SubmitHandler<
        IRegisterUserFormData
    > = async values => {
        try {
            await create.mutateAsync(values);
            toast.success('Usuário cadastrado com sucesso!');
            router.push('/users');
            funCloseModal();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <FormRegisterUserContainer>
            <FormRegisterUserTitle>Cadatrar usuário</FormRegisterUserTitle>

            <form onSubmit={handleSubmit(handleRegisterUser)}>
                <FormRegisterUserRow countItens={2}>
                    <FormInput
                        placeholder="Nome"
                        error={errors.name}
                        {...register('name')}
                    />
                    <FormInput
                        placeholder="Username"
                        error={errors.username}
                        {...register('username')}
                    />
                </FormRegisterUserRow>

                <FormRegisterUserRow countItens={1}>
                    <FormInput
                        type="email"
                        placeholder="E-mail"
                        error={errors.email}
                        {...register('email')}
                    />
                </FormRegisterUserRow>

                <FormRegisterUserRow countItens={2}>
                    <FormInput
                        type="password"
                        placeholder="Senha"
                        error={errors.password}
                        {...register('password')}
                    />
                    <FormInput
                        placeholder="Confirmar senha"
                        error={errors.password_confirmation}
                        {...register('password_confirmation')}
                    />
                </FormRegisterUserRow>

                <FormRegisterUserRow countItens={2}>
                    <FormInputSelect
                        options={data as Role[]}
                        error={errors.id_role}
                        {...register('id_role')}
                    />

                    <FormInput
                        placeholder="Telefone"
                        error={errors.telefone}
                        {...register('telefone')}
                    />
                </FormRegisterUserRow>

                <FormButton>
                    <p>Cadastrar</p>
                </FormButton>
            </form>
        </FormRegisterUserContainer>
    );
}

export { FormRegisterUser };
