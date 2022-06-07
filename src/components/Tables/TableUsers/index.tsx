import { PencilSimple, Trash } from 'phosphor-react';

import { Button } from '../../Buttons';
import { TableBody, TableContainer, TableHead, TableRow } from '../styles';

type bodyContentType = {
    data: {
        [key: string]: string;
    };
    buttonEdit: () => void;
    buttonDelete: () => void;
};

interface ITableProps {
    headerContent: string[];
    bodyContent: bodyContentType[];
}

function TableUsers({ headerContent, bodyContent }: ITableProps) {
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
                {bodyContent.map((bodyItem, index) => (
                    <TableRow key={index}>
                        <td>{bodyItem.data.name}</td>
                        <td>{bodyItem.data.office}</td>
                        <td>{bodyItem.data.email}</td>
                        <td>{bodyItem.data.telefone}</td>
                        <td>{bodyItem.data.data}</td>
                        <td className="buttons">
                            {
                                <>
                                    <Button
                                        type="edit"
                                        onClick={() => bodyItem.buttonEdit()}
                                    >
                                        <>
                                            <PencilSimple />
                                        </>
                                    </Button>

                                    <Button
                                        type="delete"
                                        onClick={() => bodyItem.buttonDelete()}
                                    >
                                        <>
                                            <Trash />
                                        </>
                                    </Button>
                                </>
                            }
                        </td>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    );
}

export { TableUsers };
