import styled from 'styled-components';

const SummaryItemContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem 0;
    padding: 1.8rem 4.4rem;
    border-radius: 5px;
    background-color: var(--dark-surface-primary);
`;

const SummaryItemTitle = styled.h1`
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--orange);
`;

const SummaryItemValue = styled.p`
    font-size: 3.6rem;
    font-weight: bold;
`;

export { SummaryItemContent, SummaryItemTitle, SummaryItemValue };
