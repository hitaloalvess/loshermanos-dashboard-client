import styled from 'styled-components';

const ProductsListContainer = styled.section``;

const ProductsListContent = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 18rem));
    grid-template-rows: repeat(auto-fit, 18rem);
    gap: 1.8rem 1.4rem;
    margin: 2.4rem 0;
`;

export { ProductsListContainer, ProductsListContent };
