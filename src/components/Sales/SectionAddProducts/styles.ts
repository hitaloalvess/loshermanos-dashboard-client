import styled from 'styled-components';

const AddProductsContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2.4rem 0;
`;

const AddProductsActions = styled.div`
    display: flex;
    gap: 2.4rem;
`;

const AddProductsTotalSale = styled.div`
    display: flex;
    align-items: center;
    gap: 0 4.4rem;
    p {
        font-size: 1.8rem;
        color: var(--text-secondary);

        &.value {
            font-size: 2rem;
            padding: 0.8rem 2.4rem;
            border-radius: 5px;
            color: var(--white);
            background-color: var(--dark-surface-primary);
        }
    }
`;

const AddProductsFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export {
    AddProductsContainer,
    AddProductsActions,
    AddProductsFooter,
    AddProductsTotalSale,
};
