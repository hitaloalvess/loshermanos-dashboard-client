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

    @media (max-width: 480px) {
        p:not(p.value) {
            display: none;
        }

        p.value {
            font-size: 2.4rem;
            padding: 0.8rem 4.4rem;
        }
    }
`;

const AddProductsFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

export {
    AddProductsContainer,
    AddProductsActions,
    AddProductsFooter,
    AddProductsTotalSale,
};
