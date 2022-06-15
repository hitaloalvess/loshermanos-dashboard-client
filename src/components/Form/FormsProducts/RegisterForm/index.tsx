import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { AuthContext } from '../../../../contexts/AuthContexts';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { FormButton } from '../../components/FormButton';
import { FormInput } from '../../components/FormInput';
import { FormInputFile } from '../../components/FormInputFile';
import { FormContainer, FormRow, FormTitle } from '../../styles';

interface IRegisterProductFormData {
    image_name: string;
    description: string;
    price: number;
}

interface IFormRegisterProduct {
    funCloseModal: () => void;
}

const registerProductFormSchema = yup.object({
    image_name: yup
        .mixed()
        .test('required', 'Imagem é obrigatório', value => {
            return !!value[0];
        })
        .test('fileFormat', 'Somente são aceitos arquivos PNG, JPEG', value => {
            if (value[0]) {
                return !!value[0].type.match(/image\/(jpeg|png)$/i);
            }

            return false;
        })
        .test('fileSize', 'Arquivo deve ser menor que 10MB', value => {
            if (value[0]) {
                return value[0].size < 10000000;
            }
            return false;
        }),
    description: yup.string().required('Descrição é obrigatório'),
    price: yup.number().required('Preço é obrigatório'),
});

function FormRegisterProduct({ funCloseModal }: IFormRegisterProduct) {
    const { user } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState('');
    const [localImageUrl, setLocalImageUrl] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
        control,
    } = useForm<IRegisterProductFormData>({
        resolver: yupResolver(registerProductFormSchema),
    });

    const create = useMutation(
        async ({
            image_name,
            description,
            price,
        }: IRegisterProductFormData) => {
            const response = await apiClient.post('/products', {
                image_name,
                description,
                price,
                id_account: user.id_account,
            });

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('products'),
        },
    );

    const handleRegisterProduct: SubmitHandler<
        IRegisterProductFormData
    > = async values => {
        try {
            const data = {
                description: values.description,
                price: values.price,
                image_name: imageUrl,
                id_account: user.id_account,
            };

            await create.mutateAsync(data);
            toast.success('Produto cadastrado com sucesso!');
            router.push('/products');
            funCloseModal();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Cadastrar produto</FormTitle>

            <form onSubmit={handleSubmit(handleRegisterProduct)}>
                <FormRow countItens={1}>
                    <FormInputFile
                        setImageUrl={setImageUrl}
                        localImageUrl={localImageUrl}
                        setLocalImageUrl={setLocalImageUrl}
                        setError={setError}
                        trigger={trigger}
                        error={errors.image_name}
                        {...register('image_name')}
                    />
                </FormRow>
                <FormRow countItens={1}>
                    <FormInput
                        placeholder="Descrição"
                        error={errors.description}
                        {...register('description')}
                    />
                </FormRow>
                <FormRow countItens={1}>
                    <FormInput
                        type="number"
                        placeholder="Preço"
                        error={errors.price}
                        {...register('price')}
                    />
                </FormRow>

                <FormButton>
                    <p>Cadastrar</p>
                </FormButton>
            </form>
        </FormContainer>
    );
}

export { FormRegisterProduct };
