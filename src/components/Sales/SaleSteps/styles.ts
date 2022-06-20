import styled from 'styled-components';

interface ISaleStepsButton {
    stageSituation: 'currentStage' | 'completedStage' | 'default';
}

const styleBorderButton = {
    currentStage: `3px solid var(--orange)`,
    completedStage: `3px solid var(--orange)`,
    default: `3px solid var(--dark-surface-primary)`,
};

const styleBackgroundButton = {
    currentStage: `transparent`,
    completedStage: `var(--orange)`,
    default: `var(--dark-surface-primary)`,
};

const SaleStepsContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SaleStepsItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0 1.2rem;
`;

const SaleStepsButton = styled.button<ISaleStepsButton>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 3.2rem;
    font-size: 1.6rem;
    color: var(--white);
    font-weight: bold;
    clip-path: circle();
    border: ${props => styleBorderButton[props.stageSituation]};
    border-radius: 50%;
    background-color: ${props => styleBackgroundButton[props.stageSituation]};
    transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out;

    svg {
        width: 2.4rem;
        height: 2.4rem;
    }

    &:hover {
        border-color: var(--orange);
        color: var(--orange);
    }
`;

const SaleStepsItemTitle = styled.p`
    display: inline-block;
    font-size: 1.6rem;
`;

const SaleStepsDivider = styled.div`
    width: calc(100% - 85rem);
    margin: 0 1rem;
    height: 2px;
    background-color: var(--text-secondary);
`;

export {
    SaleStepsContainer,
    SaleStepsItem,
    SaleStepsButton,
    SaleStepsItemTitle,
    SaleStepsDivider,
};
