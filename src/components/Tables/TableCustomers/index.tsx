import { PencilSimple, Trash } from 'phosphor-react';
import { useContext } from 'react';

import { Customer } from '../../../@types';
import { AuthContext } from '../../../contexts/AuthContexts';
import { Button } from '../../Buttons';
import { TableBody, TableContainer, TableHead, TableRow } from '../styles';

interface ITableProps {
    headerContent: string[];
    bodyContent: Customer[];
    userRole: string;
    funActiveModalDelete: (customer: Customer) => void;
    funActiveModalUpdate: (customer: Customer) => void;
}

function TableCustomers({
    headerContent,
    bodyContent,
    funActiveModalDelete,
    funActiveModalUpdate,
    userRole,
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
                            {userRole === 'admin' && (
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
                            )}
                        </TableRow>
                    ))}
            </TableBody>
        </TableContainer>
    );
}

export { TableCustomers };
