import styled from 'styled-components';

const ProductsListContainer = styled.section``;

const ProductsListContent = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 18rem));
    grid-template-rows: repeat(auto-fit, 18rem);
    gap: 1.8rem 0.8rem;
    margin: 2.4rem 0;

    @media (max-width: 768px) {
        justify-content: space-around;
    }

    @media (max-width: 480px) {
        justify-content: center;
    }
`;

export { ProductsListContainer, ProductsListContent };
