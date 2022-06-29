import styled from 'styled-components';

const SummaryItemContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.2rem 0;
    padding: 1.8rem;
    border-radius: 5px;
    background-color: var(--dark-surface-primary);
`;

const SummaryItemTitle = styled.h1`
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
    color: var(--orange);

    @media (max-width: 1024px) {
        font-size: 1.2rem;
    }
`;

const SummaryItemValue = styled.p`
    text-align: center;
    font-size: 3.6rem;
    font-weight: bold;

    @media (max-width: 1024px) {
        font-size: 2.8rem;
    }
`;

export { SummaryItemContent, SummaryItemTitle, SummaryItemValue };
