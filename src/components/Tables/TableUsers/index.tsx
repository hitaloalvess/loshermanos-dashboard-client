import dynamic from 'next/dynamic';
import { PencilSimple, Trash } from 'phosphor-react';

import { User } from '../../../@types';
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
    bodyContent: User[];
    funActiveModalDelete: (user: User) => void;
    funActiveModalUpdate: (user: User) => void;
}

function TableUsers({
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
                    bodyContent.map(bodyItem => (
                        <TableRow key={bodyItem.id}>
                            <td>{bodyItem.name}</td>
                            <td>{bodyItem.username}</td>
                            <td>{bodyItem.email}</td>
                            <td>{bodyItem.telefone}</td>
                            <OnlyAdminAllowed>
                                <td className="buttons">
                                    {
                                        <>
                                            <Button
                                                type="edit"
                                                onClick={() =>
                                                    funActiveModalUpdate(
                                                        bodyItem as User,
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
                                                        bodyItem as User,
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

export { TableUsers };
