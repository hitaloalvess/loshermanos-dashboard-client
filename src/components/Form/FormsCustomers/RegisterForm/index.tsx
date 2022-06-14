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
import { FormContainer, FormRow, FormTitle } from '../../styles';

interface IRegisterUserFormData {
    name: string;
    road: string;
    cpf: string;
    district: string;
    number: string;
    city: string;
    zip_code: string;
    phone: string;
}

interface IFormRegisterProps {
    funCloseModal: () => void;
}

const registerCustomerFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    road: yup.string().required('Rua é obrigatório'),
    cpf: yup
        .string()
        .required('Cpf é obrigatório')
        .matches(
            /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/,
            'Cpf inválido',
        ),
    district: yup.string().required('Bairro é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    zip_code: yup
        .string()
        .required('Campo cep é obrigatório')
        .matches(/^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/, 'Formato de cep inválido'),
    phone: yup
        .string()
        .required('Campo telefone é obrigatório')
        .matches(
            /^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}-[0-9]{4}$/,
            'Formato de telefone inválido',
        ),
});

function FormRegisterCustomer({ funCloseModal }: IFormRegisterProps) {
    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterUserFormData>({
        resolver: yupResolver(registerCustomerFormSchema),
    });

    const create = useMutation(
        async ({
            name,
            road,
            cpf,
            district,
            number,
            city,
            zip_code,
            phone,
        }: IRegisterUserFormData) => {
            const response = await apiClient.post('/customers', {
                name,
                road,
                cpf,
                district,
                number,
                city,
                zip_code,
                phone,
                id_account: user.id_account,
            });

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('customers'),
        },
    );

    const handleRegisterCustomer: SubmitHandler<
        IRegisterUserFormData
    > = async values => {
        try {
            await create.mutateAsync(values);
            toast.success('Cliente cadastrado com sucesso!');
            router.push('/customers');
            funCloseModal();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Cadatrar usuário</FormTitle>

            <form onSubmit={handleSubmit(handleRegisterCustomer)}>
                <FormRow countItens={2}>
                    <FormInput
                        placeholder="Nome"
                        error={errors.name}
                        {...register('name')}
                    />
                    <FormInput
                        placeholder="Rua"
                        error={errors.road}
                        {...register('road')}
                    />
                </FormRow>

                <FormRow countItens={2}>
                    <FormInput
                        placeholder="Cpf"
                        error={errors.cpf}
                        {...register('cpf')}
                    />
                    <FormInput
                        placeholder="Telefone"
                        error={errors.phone}
                        {...register('phone')}
                    />
                </FormRow>

                <FormRow countItens={2}>
                    <FormInput
                        placeholder="Bairro"
                        error={errors.district}
                        {...register('district')}
                    />
                    <FormInput
                        placeholder="Número"
                        error={errors.number}
                        {...register('number')}
                    />
                </FormRow>

                <FormRow countItens={2}>
                    <FormInput
                        placeholder="Cidade"
                        error={errors.city}
                        {...register('city')}
                    />

                    <FormInput
                        placeholder="Cep"
                        error={errors.zip_code}
                        {...register('zip_code')}
                    />
                </FormRow>

                <FormButton>
                    <p>Cadastrar</p>
                </FormButton>
            </form>
        </FormContainer>
    );
}

export { FormRegisterCustomer };
