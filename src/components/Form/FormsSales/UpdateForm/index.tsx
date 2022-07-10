import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import { CurrencyCircleDollar, NotePencil, Ticket, User } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Customer, Product, Sale } from '../../../../@types';
import { AuthContext } from '../../../../contexts/AuthContexts';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { FormButton } from '../../components/FormButton';
import { FormButtonCancel } from '../../components/FormButtonCancel';
import { FormInput } from '../../components/FormInput';
import { FormInputSearch } from '../../components/FormInputSearch';
import { FormRadioButton } from '../../components/FormRadioButton';
import { FormRadioGroup } from '../../components/FormRadioGroup';
import { FormContainer, FormRow, FormTitle } from '../../styles';
import { UpdateFormActions } from './styles';

interface IUpdateSaleFormData {
    customer: string;
    date: string;
    descount: number;
    saleType: string;
}

interface IRequestSale {
    total: number;
    value_pay: number;
    descount: number;
    sale_type: string;
    updated_at: Date;
    id_account: string;
    id_customer: string;
    products: Product[];
}

interface IUpdateFormProps {
    defaultSale: Sale;
    customers: Customer[];
    totalSale: number;
    saleProducts: Product[];
    updateStage: (currentStage: number) => void;
}

const updateSaleFormSchema = yup.object({
    customer: yup.string().required('Name é obrigatório'),
    saleType: yup.string().nullable().required('Tipo de venda é obrigatório'),
});

function UpdateForm({
    defaultSale,
    customers,
    totalSale,
    saleProducts,
    updateStage,
}: IUpdateFormProps) {
    const [customer, setCustomer] = useState<Customer>(
        defaultSale.customer as Customer,
    );

    const {
        user: { id_account },
    } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IUpdateSaleFormData>({
        resolver: yupResolver(updateSaleFormSchema),
    });

    const getCustomer = (customer: Customer) => {
        setCustomer(customer);
    };

    const update = useMutation(
        async (sale: IRequestSale) => {
            const response = await apiClient.put(
                `/sales/${defaultSale.id}`,
                sale,
            );

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('sales'),
        },
    );

    const handleCreateSale: SubmitHandler<
        IUpdateSaleFormData
    > = async values => {
        try {
            const descount = !values.descount ? 0 : Number(values.descount);
            const value_pay = values.saleType === 'PAID_OUT' ? totalSale : 0;

            const data: IRequestSale = {
                total: totalSale,
                value_pay,
                descount,
                sale_type: values.saleType,
                updated_at: new Date(),
                id_account,
                id_customer: customer?.id as string,
                products: saleProducts,
            };

            await update.mutateAsync(data);
            toast.success('Venda atualizada com sucesso');
            router.push('/sales');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(handleCreateSale)}>
                <FormRow countItens={1}>
                    <FormInputSearch
                        items={customers}
                        getItem={getCustomer}
                        placeholder="Nome do cliente"
                        defaultValue={customer?.name}
                        error={errors.customer}
                        register={register}
                        setValue={setValue}
                    >
                        <>
                            <User />
                        </>
                    </FormInputSearch>
                </FormRow>

                <FormRow countItens={1}>
                    <FormInput
                        type="number"
                        placeholder="Desconto"
                        defaultValue={defaultSale.descount || 0}
                        error={errors.descount}
                        {...register('descount')}
                    >
                        <Ticket />
                    </FormInput>
                </FormRow>

                <FormRow countItens={1}>
                    <FormRadioGroup error={errors.saleType}>
                        <>
                            <FormRadioButton
                                id="paidOut"
                                value="PAID_OUT"
                                defaultValue={defaultSale.sale_type}
                                error={errors.saleType}
                                {...register('saleType')}
                            >
                                <>
                                    <CurrencyCircleDollar />
                                    <p>Á vista</p>
                                </>
                            </FormRadioButton>

                            <FormRadioButton
                                id="pendingPayment"
                                value="PENDING"
                                defaultValue={defaultSale.sale_type}
                                error={errors.saleType}
                                {...register('saleType')}
                            >
                                <>
                                    <NotePencil />
                                    <p>Á prazo</p>
                                </>
                            </FormRadioButton>
                        </>
                    </FormRadioGroup>
                </FormRow>

                <UpdateFormActions>
                    <FormButtonCancel funOnClick={() => updateStage(2)}>
                        <p>Voltar</p>
                    </FormButtonCancel>

                    <FormButton>
                        <p>Confirmar</p>
                    </FormButton>
                </UpdateFormActions>
            </form>
        </FormContainer>
    );
}

export { UpdateForm };
