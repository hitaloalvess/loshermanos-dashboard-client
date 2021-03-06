import styled from 'styled-components';

const SectionMyCartContainer = styled.section``;

const SectionMyCartTitle = styled.header`
    display: flex;
    gap: 0 1.2rem;
    svg {
        width: 3rem;
        height: 3rem;
    }
    h3 {
        display: inline-block;
        font-size: 1.8rem;
    }
`;

const SectionMyCartItems = styled.table`
    position: relative;
    width: 100%;
    margin: 2.4rem 0;
    border-collapse: separate;
    border-spacing: 0 2.4rem;
    border-bottom: 1px solid var(--dark-surface-primary);
    border-top: 1px solid var(--dark-surface-primary);

    thead {
        th {
            text-align: start;
            color: var(--orange);

            &:nth-child(2) {
                padding: 0 0 0 2.4rem;
            }
        }

        @media (max-width: 480px) {
            display: none;
        }
    }

    tbody {
        td + td {
            margin: 0 1.2rem 0 0;
        }
        & p {
            font-size: 1.8rem;
        }
    }
`;

const SectionMyCartItem = styled.tr``;

const MyCartItemImage = styled.td`
    position: relative;
    width: 8rem;
    height: 8rem;
    border-radius: 8px;
    img {
        width: 8rem;
        height: 8rem;
        border-radius: 5px;
    }
`;

const MyCartItemTitle = styled.td`
    padding: 0 0 0 2.4rem;

    @media (max-width: 480px) {
        display: block;
    }
`;

const MyCartItemCounter = styled.td`
    height: 8rem;
    display: flex;
    align-items: center;
    gap: 0 1.6rem;

    @media (max-width: 480px) {
        gap: 0.8rem;
        padding: 0 0 0 2.4rem;
        height: 4rem;
    }
`;

const MyCartItemButton = styled.button`
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

const MyCartItemTotal = styled.td``;

const SectionMyCartFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

const SectionMyCartFooterActions = styled.div`
    display: flex;
    gap: 2.4rem;

    @media (max-width: 480px) {
        margin-left: auto;
    }
`;

const SectionMyCartFooterTotal = styled.div`
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
        margin-left: auto;
        /* p:not(p.value) {
            display: none;
        } */
    }
`;

export {
    SectionMyCartContainer,
    SectionMyCartTitle,
    SectionMyCartItems,
    SectionMyCartItem,
    MyCartItemImage,
    MyCartItemTitle,
    MyCartItemCounter,
    MyCartItemTotal,
    MyCartItemButton,
    SectionMyCartFooter,
    SectionMyCartFooterActions,
    SectionMyCartFooterTotal,
};
