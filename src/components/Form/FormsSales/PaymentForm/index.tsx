import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Sale } from '../../../../@types';
import { apiClient } from '../../../../services/apiClient';
import { queryClient } from '../../../../services/queryClient';
import { formatInReal } from '../../../../utils/formatInReal';
import { FormButton } from '../../components/FormButton';
import { FormButtonCancel } from '../../components/FormButtonCancel';
import { FormInput } from '../../components/FormInput';
import { FormContainer, FormRow, FormTitle } from '../../styles';
import { PaymentFormActions, ValuePayLabel, ValuePayTitle } from './styles';

interface IPaymentFormProps {
    sale: Sale;
    funCloseModal: () => void;
}

interface IPaymentSaleFormData {
    valuePay: number;
    valueTotal?: number;
}

const paymentSaleFormSchema = yup.object({
    valuePay: yup
        .string()
        .required('Digite o valor a ser abatido !')
        .test(
            'valueGreaterThan0',
            'Somente valores maiores do que 0',
            function testeValueGreaterThan0(value) {
                const valuePay = parseFloat(value as string);

                return valuePay > 0;
            },
        )
        .test(
            'valueExceeded',
            'Somente valores menores que o valor a pagar',
            function testeValueExceeded(value) {
                const valuePay = Number.parseFloat(value as string);
                const valueTotal = parseFloat(this.parent.valueTotal);

                return valuePay <= valueTotal;
            },
        ),
});

function PaymentForm({ sale, funCloseModal }: IPaymentFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPaymentSaleFormData>({
        resolver: yupResolver(paymentSaleFormSchema),
    });

    const calculateAmountPayable = useMemo(() => {
        return sale.total - sale.descount - sale.value_pay;
    }, [sale]);

    useEffect(() => {
        setValue('valueTotal', calculateAmountPayable);
    }, [calculateAmountPayable]);

    const payment = useMutation(
        async ({ valuePay }: IPaymentSaleFormData) => {
            const response = await apiClient.patch(
                `/sales/payment/${sale.id}`,
                {
                    value_pay: valuePay,
                    descount: sale.descount,
                },
            );

            return response.data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('sales'),
        },
    );

    const handleSalePayment: SubmitHandler<
        IPaymentSaleFormData
    > = async values => {
        const { valuePay } = values;
        await payment.mutateAsync({ valuePay });
        toast.success('Venda atualizada com sucesso');
        funCloseModal();
    };

    return (
        <FormContainer>
            <FormTitle>Abater venda</FormTitle>

            <form onSubmit={handleSubmit(handleSalePayment)}>
                <FormRow countItens={2}>
                    <FormInput
                        disabled
                        defaultValue={calculateAmountPayable}
                        placeholder="Valor a descontar"
                        error={errors.valueTotal}
                        {...register('valueTotal')}
                    />

                    <ValuePayLabel>
                        <ValuePayTitle>Valor a pagar</ValuePayTitle>
                        <p>{formatInReal(calculateAmountPayable)}</p>
                    </ValuePayLabel>

                    <FormInput
                        type="number"
                        placeholder="Valor a descontar"
                        error={errors.valuePay}
                        {...register('valuePay')}
                    />
                </FormRow>

                <PaymentFormActions>
                    <FormButtonCancel funOnClick={() => funCloseModal()}>
                        <p>Cancelar</p>
                    </FormButtonCancel>

                    <FormButton>
                        <p>Confirmar</p>
                    </FormButton>
                </PaymentFormActions>
            </form>
        </FormContainer>
    );
}

export { PaymentForm };
