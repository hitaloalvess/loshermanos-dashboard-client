import styled from 'styled-components';

const TableContainer = styled.table`
    width: 90%;
    border-spacing: 0 1.2rem;
    background-color: transparent;
`;

const TableHead = styled.thead`
    tr {
        background-color: transparent;
    }
    th {
        text-align: center;
        font-weight: 400;
        font-size: 1.6rem;
        color: var(--text-secondary);
    }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    background-color: var(--dark-surface-primary);
    td {
        font-size: 1.4rem;
        text-align: center;
        padding: 2.4rem 0;

        &:first-child {
            border-radius: 8px 0 0 8px;
        }
        &:last-child {
            border-radius: 0 8px 8px 0;
        }

        &.buttons {
            button + button {
                margin-left: 0.8rem;
            }
        }
    }
`;

export { TableContainer, TableHead, TableBody, TableRow };
