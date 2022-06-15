import styled from 'styled-components';

const ContentProducts = styled.main`
    display: flex;
    flex-direction: column;
    gap: 4.4rem 0;
`;

const ContentProductsHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 3.6rem;
        font-weight: bold;
    }
`;

export { ContentProducts, ContentProductsHeader };
