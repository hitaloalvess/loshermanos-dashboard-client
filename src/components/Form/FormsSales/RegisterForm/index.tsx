import { yupResolver } from '@hookform/resolvers/yup';
import router from 'next/router';
import {
    CalendarBlank,
    CurrencyCircleDollar,
    NotePencil,
    Ticket,
    User,
} from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Customer, Product } from '../../../../@types';
import { AuthContext } from '../../../../contexts/AuthContexts';
import { useCustomers } from '../../../../hooks/useCustomers';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { FormButton } from '../../components/FormButton';
import { FormButtonCancel } from '../../components/FormButtonCancel';
import { FormInput } from '../../components/FormInput';
import { FormInputSearch } from '../../components/FormInputSearch';
import { FormRadioButton } from '../../components/FormRadioButton';
import { FormRadioGroup } from '../../components/FormRadioGroup';
import { FormContainer, FormRow, FormTitle } from '../../styles';
import { RegisterFormActions } from './styles';

interface ICreateSaleFormData {
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

interface IRegisterFormProps {
    customers: Customer[];
    totalSale: number;
    saleProducts: Product[];
    updateStage: (currentStage: number) => void;
}

const createSaleFormSchema = yup.object({
    customer: yup.string().required('Name é obrigatório'),
    saleType: yup.string().nullable().required('Tipo de venda é obrigatório'),
});

function RegisterForm({
    customers,
    totalSale,
    saleProducts,
    updateStage,
}: IRegisterFormProps) {
    const [customer, setCustomer] = useState<Customer>();
    const {
        user: { id_account },
    } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ICreateSaleFormData>({
        resolver: yupResolver(createSaleFormSchema),
    });

    const getCustomer = (customer: Customer) => {
        setCustomer(customer);
    };

    const create = useMutation(
        async (sale: IRequestSale) => {
            const response = await apiClient.post(`/sales`, sale);

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('sales'),
        },
    );

    const handleCreateSale: SubmitHandler<
        ICreateSaleFormData
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

            await create.mutateAsync(data);
            toast.success('Venda cadastrada com sucesso');
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

                <RegisterFormActions>
                    <FormButtonCancel funOnClick={() => updateStage(2)}>
                        <p>Voltar</p>
                    </FormButtonCancel>

                    <FormButton>
                        <p>Confirmar</p>
                    </FormButton>
                </RegisterFormActions>
            </form>
        </FormContainer>
    );
}

export { RegisterForm };
