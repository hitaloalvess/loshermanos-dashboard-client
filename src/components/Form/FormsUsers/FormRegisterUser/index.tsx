import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { AuthContext } from '../../../../contexts/AuthContexts';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { FormButton } from '../../components/FormButton';
import { FormInput } from '../../components/FormInput';
import { FormInputSelect } from '../../components/FormInputSelect';
import { FormContainer, FormRow, FormTitle } from '../../styles';

interface IRegisterUserFormData {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    telefone: string;
    admin: string;
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
    admin: yup.string().required('Campo admin é obrigatório'),
});

function FormRegisterUser({ funCloseModal }: IFormRegisterProps) {
    const { user } = useContext(AuthContext);

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
            admin,
            telefone,
        }: IRegisterUserFormData) => {
            const response = await apiClient.post('/users', {
                name,
                email,
                username,
                password,
                telefone,
                admin: admin === 'true',
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
        <FormContainer>
            <FormTitle>Cadatrar usuário</FormTitle>

            <form onSubmit={handleSubmit(handleRegisterUser)}>
                <FormRow countItens={2}>
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
                </FormRow>

                <FormRow countItens={1}>
                    <FormInput
                        type="email"
                        placeholder="E-mail"
                        error={errors.email}
                        {...register('email')}
                    />
                </FormRow>

                <FormRow countItens={2}>
                    <FormInput
                        type="password"
                        placeholder="Senha"
                        error={errors.password}
                        {...register('password')}
                    />
                    <FormInput
                        type="password"
                        placeholder="Confirmar senha"
                        error={errors.password_confirmation}
                        {...register('password_confirmation')}
                    />
                </FormRow>

                <FormRow countItens={2}>
                    <FormInputSelect
                        error={errors.admin}
                        {...register('admin')}
                    />

                    <FormInput
                        placeholder="Telefone"
                        error={errors.telefone}
                        {...register('telefone')}
                    />
                </FormRow>

                <FormButton>
                    <p>Cadastrar</p>
                </FormButton>
            </form>
        </FormContainer>
    );
}

export { FormRegisterUser };
