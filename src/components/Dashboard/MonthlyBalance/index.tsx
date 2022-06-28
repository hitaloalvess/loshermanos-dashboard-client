import { useState } from 'react';

import BalanceChart from '../BalanceChart';
import {
    MonthlyBalanceContainer,
    MonthlyBalanceHeader,
    MonthlyBalanceSelect,
    MonthlyBalanceTitle,
} from './styles';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

type monthlyBalanceType = {
    [key: string]: object;
};

interface IMonthlyBalanceProps {
    balance: any[];
}

function MonthlyBalance({ balance }: IMonthlyBalanceProps) {
    const [selectedMonth, setSelectedMonth] = useState<number>(0);

    return (
        <MonthlyBalanceContainer>
            <MonthlyBalanceHeader>
                <MonthlyBalanceTitle>Balanço mensal</MonthlyBalanceTitle>
                <MonthlyBalanceSelect
                    onChange={e => setSelectedMonth(Number(e.target.value))}
                >
                    {balance?.map((item, index) => {
                        return (
                            <option key={index} value={index}>
                                {months[Number(item.month)]}
                            </option>
                        );
                    })}
                </MonthlyBalanceSelect>
            </MonthlyBalanceHeader>

            <BalanceChart balance={balance[selectedMonth].data} />
        </MonthlyBalanceContainer>
    );
}

export { MonthlyBalance };
