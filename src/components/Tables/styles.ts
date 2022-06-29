import styled from 'styled-components';

const TableContainer = styled.table`
    width: 100%;
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

    @media (max-width: 480px) {
        display: none;
    }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    background-color: var(--dark-surface-primary);
    td {
        font-size: 1.4rem;
        text-align: center;
        padding: 1.6rem 0;

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

    @media (max-width: 480px) {
        position: relative;
        display: block;
        text-align: center;
        margin-bottom: 2rem;
        border-radius: 5px;

        td {
            display: block;
            padding: 1.2rem 0;
            &:last-child {
                width: 100%;
            }
        }
    }
`;

export { TableContainer, TableHead, TableBody, TableRow };
