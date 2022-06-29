import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import router from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { api } from '../../../services/api';
import { FormButton } from '../components/FormButton';
import { FormInput } from '../components/FormInput';
import {
    FormSignUpBackButton,
    FormSignUpContainer,
    FormSignUpTitle,
} from './styles';

interface ISignUpFormData {
    name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    telefone: string;
    name_stablishment: string;
}

const signUpFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
        .string()
        .required('E-mail é obrigatório')
        .email('E-mail inválido'),
    username: yup.string().required('Username é obrigatório'),
    password: yup.string().required('Senha obrigatória'),
    password_confirmation: yup
        .string()
        .oneOf([null, yup.ref('password')], 'As senhas devem ser iguais'),
    telefone: yup.string().required('Telefone é obrigatório'),
    name_stablishment: yup
        .string()
        .required('Nome do estabelecimento é obrigatório'),
});

function FormSignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUpFormData>({
        resolver: yupResolver(signUpFormSchema),
    });

    const create = async ({
        name,
        email,
        username,
        password,
        telefone,
        name_stablishment,
    }: ISignUpFormData): Promise<AxiosResponse> => {
        const response = await api.post('/account', {
            name,
            email,
            username,
            password,
            telefone,
            name_stablishment,
        });

        return response.data;
    };

    const handleSignUp: SubmitHandler<ISignUpFormData> = async values => {
        try {
            await create(values);
            toast.success('Conta cadastrada com sucesso!');
            router.push('/');
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <FormSignUpContainer>
            <FormSignUpBackButton href="/">
                <ArrowLeft />
            </FormSignUpBackButton>

            <FormSignUpTitle>Criar conta</FormSignUpTitle>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <FormInput
                    placeholder="Nome"
                    error={errors.name}
                    {...register('name')}
                />
                <FormInput
                    type="email"
                    placeholder="E-mail"
                    error={errors.email}
                    {...register('email')}
                />
                <FormInput
                    placeholder="Username"
                    error={errors.username}
                    {...register('username')}
                />
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
                <FormInput
                    type="tel"
                    placeholder="Telefone"
                    error={errors.telefone}
                    {...register('telefone')}
                />
                <FormInput
                    placeholder="Nome do estabelecimento"
                    error={errors.name_stablishment}
                    {...register('name_stablishment')}
                />

                <FormButton>
                    <p>Cadastrar</p>
                </FormButton>
            </form>
        </FormSignUpContainer>
    );
}

export { FormSignUp };
