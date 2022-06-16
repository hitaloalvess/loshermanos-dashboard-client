import { yupResolver } from '@hookform/resolvers/yup';
import { User, Lock } from 'phosphor-react';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AuthContext } from '../../../contexts/AuthContexts';
import { FormButton } from '../components/FormButton';
import { FormInput } from '../components/FormInput';
import { FormLoginContainer, FormLoginTitle, RegisterNow } from './styles';

interface IUserData {
    username: string;
    password: string;
}

const loginFormSchema = yup.object({
    username: yup.string().required('Username obrigatório'),
    password: yup.string().required('Senha obrigatória'),
});

function FormLogin() {
    const { signIn } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserData>({
        resolver: yupResolver(loginFormSchema),
    });

    const handleSubmitLogin: SubmitHandler<IUserData> = values => {
        signIn(values);
    };
    return (
        <FormLoginContainer>
            <FormLoginTitle>Login</FormLoginTitle>

            <form onSubmit={handleSubmit(handleSubmitLogin)}>
                <FormInput
                    placeholder="Username"
                    {...register('username')}
                    error={errors.username}
                >
                    <User />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                    error={errors.password}
                >
                    <Lock />
                </FormInput>

                <FormButton>
                    <p>Entrar</p>
                </FormButton>
            </form>

            <RegisterNow>
                <p>Não tem uma conta?</p>
                <a href="">Registre-se agora</a>
            </RegisterNow>
        </FormLoginContainer>
    );
}

export { FormLogin };
