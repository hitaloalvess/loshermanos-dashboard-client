import dynamic from 'next/dynamic';
import { PencilSimple, Trash } from 'phosphor-react';

import { Customer } from '../../../@types';
import { Button } from '../../Buttons';
import { IOnlyAdminAllowedProps } from '../../OnlyAdminAllowed';
import { TableBody, TableContainer, TableHead, TableRow } from '../styles';

const OnlyAdminAllowed = dynamic<IOnlyAdminAllowedProps>(
    () =>
        import('../../OnlyAdminAllowed').then(
            ({ OnlyAdminAllowed }) => OnlyAdminAllowed,
        ),
    { ssr: false },
);

interface ITableProps {
    headerContent: string[];
    bodyContent: Customer[];
    admin: boolean;
    funActiveModalDelete: (customer: Customer) => void;
    funActiveModalUpdate: (customer: Customer) => void;
}

function TableCustomers({
    headerContent,
    bodyContent,
    funActiveModalDelete,
    funActiveModalUpdate,
}: ITableProps) {
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
                    bodyContent.map(customer => (
                        <TableRow key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{`${customer.road}, ${customer.number}`}</td>
                            <td>{customer.phone}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(customer.created_at as string),
                                )}
                            </td>
                            <OnlyAdminAllowed>
                                <td className="buttons">
                                    {
                                        <>
                                            <Button
                                                type="edit"
                                                onClick={() =>
                                                    funActiveModalUpdate(
                                                        customer as Customer,
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
                                                    funActiveModalDelete(
                                                        customer as Customer,
                                                    )
                                                }
                                            >
                                                <>
                                                    <Trash />
                                                </>
                                            </Button>
                                        </>
                                    }
                                </td>
                            </OnlyAdminAllowed>
                        </TableRow>
                    ))}
            </TableBody>
        </TableContainer>
    );
}

export { TableCustomers };
