import styled from 'styled-components';

const TopSellingProductsContainer = styled.div`
    grid-area: topSellingProducts;
    width: 100%;
    height: 35rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem 0;
    padding: 2.4rem 3.2rem;
    border-radius: 8px;
    background-color: var(--dark-surface-primary);
`;

const TopSellingProductsTitle = styled.h1`
    font-size: 2rem;
    font-weight: 500;
`;

const TopSellingProductsList = styled.table`
    width: 100%;
    height: 100%;
    thead,
    tbody {
        display: block;
    }
    thead {
        margin-bottom: 1.2rem;
        tr {
            display: flex;
            justify-content: space-between;
            align-items: center;
            th {
                font-size: 1.6rem;
                font-weight: 500;
                color: var(--orange);
            }
        }
    }
    tbody {
        overflow-y: auto;
        height: 22rem;
        &::-webkit-scrollbar {
            width: 0.5rem;
            background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 24px;
            background: var(--background);
        }
        &::-webkit-scrollbar-thumb:hover {
            background: var(--orange);
        }
        tr {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 0.8rem 0.8rem 0;
            td {
                font-size: 1.4rem;
                font-weight: 400;
            }
        }
    }
`;

export {
    TopSellingProductsContainer,
    TopSellingProductsTitle,
    TopSellingProductsList,
};
