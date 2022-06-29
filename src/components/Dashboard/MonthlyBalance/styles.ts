import styled from 'styled-components';

const MonthlyBalanceContainer = styled.div`
    grid-area: balance;
    height: 35rem;
    padding: 2.4rem 3.2rem;
    border-radius: 8px;
    background-color: var(--dark-surface-primary);
`;

const MonthlyBalanceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
    h1 {
    }
`;

const MonthlyBalanceTitle = styled.h1`
    font-size: 2rem;
    font-weight: 500;
`;

const MonthlyBalanceSelect = styled.select`
    padding: 0.6rem 1.4rem;
    font-size: 1.2rem;
    font-family: 'Roboto Slab', sans-serif;
    border: 1px solid transparent;
    border-radius: 4px;
    outline: none;
    color: var(--white);
    background-color: var(--background);
    &:focus {
        border-color: var(--orange);
    }
`;

export {
    MonthlyBalanceContainer,
    MonthlyBalanceHeader,
    MonthlyBalanceSelect,
    MonthlyBalanceTitle,
};
