import styled from 'styled-components';

interface IProductCardBannerProps {
    userIsAdmin?: boolean;
    isCardForSales?: boolean;
}

const ProductCardContainer = styled.div`
    width: 18rem;
    height: 18rem;
    border-radius: 5px;
    background-color: var(--dark-surface-primary);
`;

const ProductCardBanner = styled.div<IProductCardBannerProps>`
    position: relative;
    width: 100%;
    height: ${props => {
        if (props.isCardForSales) {
            return `14rem`;
        }

        return props.userIsAdmin ? `14rem` : `100%`;
    }};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${props => (props.userIsAdmin ? `5px 5px 0 0` : `5px`)};
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 5px 5px 0 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const ProductCardPrice = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 5px 0 5px;
    z-index: 99;
    background-color: var(--orange);
    p {
        font-size: 1.4rem;
        font-weight: bold;
        padding: 0.4rem;
    }
`;

const ProductCardTitle = styled.div`
    position: absolute;
    bottom: 0.4rem;
    left: 0.8rem;
    z-index: 99;
    p {
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

const ProductCardActionsForSales = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 1.6rem;
`;

const SalesCardButton = styled.button`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    background-color: var(--dark-secondary-hover);
    transition: filter 0.3s ease-in-out;

    svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--white);
    }

    &:hover {
        filter: brightness(1.2);
    }
`;

const SalesCardCount = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 2.3rem;
    color: var(--white);
`;

const ProductCardActions = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;

    button {
        padding: 0.6rem 0.8rem;
        svg {
            width: 1.6rem;
            height: 1.6rem;
        }
    }
`;

export {
    ProductCardContainer,
    ProductCardBanner,
    ProductCardPrice,
    ProductCardTitle,
    ProductCardActionsForSales,
    ProductCardActions,
    SalesCardButton,
    SalesCardCount,
};
