import { CreditCard, PencilSimple, Trash } from 'phosphor-react';

import { Sale } from '../../../@types';
import { formatInReal } from '../../../utils/formatInReal';
import { Button } from '../../Buttons';
import { TableBody, TableContainer, TableHead, TableRow } from '../styles';
import { StatusContainer } from './styles';

interface ITableProps {
    headerContent: string[];
    bodyContent: Sale[];
    admin: boolean;
    funActiveModalDelete: (sale: Sale) => void;
    funUpdateSale: (saleId: string) => void;
    funActiveModalPayment: (sale: Sale) => void;
}

interface ICalcTotalSaleParams {
    total: number;
    valuePay: number;
    descount: number;
    saleSituation: 'PENDING' | 'PAID_OUT';
}

function TableSales({
    headerContent,
    bodyContent,
    admin,
    funActiveModalDelete,
    funUpdateSale,
    funActiveModalPayment,
}: ITableProps) {
    const calcTotalSale = ({
        total,
        valuePay,
        descount,
        saleSituation,
    }: ICalcTotalSaleParams) => {
        if (saleSituation === 'PAID_OUT') {
            return total;
        }

        return total - descount - valuePay;
    };

    return (
        <TableContainer>
            <TableHead>
                <TableRow>
                    {headerContent.map((headerItem, index) => (
                        <th key={index}>{headerItem}</th>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {bodyContent &&
                    bodyContent.map(sale => (
                        <TableRow key={sale.id}>
                            <td>{sale.customer?.name}</td>
                            <td>
                                {formatInReal(
                                    calcTotalSale({
                                        total: sale.total,
                                        valuePay: sale.value_pay,
                                        descount: sale.descount,
                                        saleSituation: sale.sale_type,
                                    }),
                                )}
                            </td>
                            <td>
                                <StatusContainer type={sale.sale_type}>
                                    <p>
                                        {sale.sale_type === 'PENDING'
                                            ? 'Pendente'
                                            : 'Pago'}
                                    </p>
                                </StatusContainer>
                            </td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(sale.created_at as string),
                                )}
                            </td>
                            {admin && (
                                <td className="buttons">
                                    {
                                        <>
                                            <Button
                                                type="edit"
                                                onClick={() =>
                                                    funUpdateSale(
                                                        sale.id as string,
                                                    )
                                                }
                                            >
                                                <>
                                                    <PencilSimple />
                                                </>
                                            </Button>

                                            <Button
                                                type="delete"
                                                onClick={() =>
                                                    funActiveModalDelete(sale)
                                                }
                                            >
                                                <>
                                                    <Trash />
                                                </>
                                            </Button>

                                            {sale.sale_type === 'PENDING' && (
                                                <Button
                                                    type="payment"
                                                    onClick={() =>
                                                        funActiveModalPayment(
                                                            sale,
                                                        )
                                                    }
                                                >
                                                    <>
                                                        <CreditCard />
                                                    </>
                                                </Button>
                                            )}
                                        </>
                                    }
                                </td>
                            )}
                        </TableRow>
                    ))}
            </TableBody>
        </TableContainer>
    );
}

export { TableSales };
