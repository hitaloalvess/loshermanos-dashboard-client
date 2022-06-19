import styled from 'styled-components';

const PaymentFormActions = styled.div`
    display: flex;
    gap: 0 2.4rem;
`;

const ValuePayLabel = styled.label`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: var(--dark-surface-primary);

    p {
        font-size: 2rem;
        font-weight: bold;
        color: var(--white);
    }
`;

const ValuePayTitle = styled.div`
    position: absolute;
    top: -1rem;
    left: 1rem;
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--orange);
`;

export { PaymentFormActions, ValuePayLabel, ValuePayTitle };
