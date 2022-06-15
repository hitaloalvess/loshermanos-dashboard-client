import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Product } from '../../../../@types';
import { AuthContext } from '../../../../contexts/AuthContexts';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { FormButton } from '../../components/FormButton';
import { FormInput } from '../../components/FormInput';
import { FormInputFile } from '../../components/FormInputFile';
import { FormContainer, FormRow, FormTitle } from '../../styles';

interface IUpdateProductFormData {
    image_name: string;
    description: string;
    price: number;
}

interface IFormUpdateProduct {
    product: Product;
    funCloseModal: () => void;
}

const updateProductFormSchema = yup.object({
    description: yup.string().required('Descrição é obrigatório'),
    price: yup.number().required('Preço é obrigatório'),
});

function FormUpdateProduct({ product, funCloseModal }: IFormUpdateProduct) {
    const [imageUrl, setImageUrl] = useState(product.image_name);
    const [localImageUrl, setLocalImageUrl] = useState(
        `${process.env.BASE_URL_IMAGE_LOCAL}/${product.image_name}`,
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
        control,
    } = useForm<IUpdateProductFormData>({
        resolver: yupResolver(updateProductFormSchema),
    });

    const update = useMutation(
        async ({ image_name, description, price }: IUpdateProductFormData) => {
            const response = await apiClient.put(`/products/${product.id}`, {
                image_name,
                description,
                price,
            });

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('products'),
        },
    );

    const handleUpdateProduct: SubmitHandler<
        IUpdateProductFormData
    > = async values => {
        try {
            const data = {
                description: values.description,
                price: values.price,
                image_name: imageUrl,
            };

            await update.mutateAsync(data);
            toast.success('Produto atualizado com sucesso!');
            router.push('/products');
            funCloseModal();
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Atualizar produto</FormTitle>

            <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                        defaultValue={product.description}
                        placeholder="Descrição"
                        error={errors.description}
                        {...register('description')}
                    />
                </FormRow>
                <FormRow countItens={1}>
                    <FormInput
                        defaultValue={product.price}
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

export { FormUpdateProduct };
