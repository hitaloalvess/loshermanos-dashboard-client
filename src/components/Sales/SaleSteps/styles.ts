import styled from 'styled-components';

interface IStepsItemProps {
    stageSituation: 'currentStage' | 'completedStage' | 'default';
}

const styleBorderButton = {
    currentStage: `3px solid var(--orange)`,
    completedStage: `3px solid var(--orange)`,
    default: `3px solid var(--dark-surface-primary)`,
};

const styleBackgroundButton = {
    currentStage: `var(--dark-surface-primary)`,
    completedStage: `var(--orange)`,
    default: `var(--dark-surface-primary)`,
};

const styleBackgroundDivider = {
    currentStage: `var(--orange)`,
    completedStage: `var(--orange)`,
    default: `var(--dark-surface-primary)`,
};

const SaleStagesContainer = styled.section`
    width: 100%;
`;

const StepsContainer = styled.ul`
    counter-reset: step;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const StepsItem = styled.li<IStepsItemProps>`
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.8rem 0;

    p {
        font-size: 1.2rem;
    }

    &:before {
        content: counter(step);
        counter-increment: step;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 3rem;
        height: 3rem;
        clip-path: circle();
        border-radius: 50%;
        border: ${props => styleBorderButton[props.stageSituation]};
        background-color: ${props =>
            styleBackgroundButton[props.stageSituation]};
    }

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        top: 1.5rem;
        left: -50%;
        background-color: var(--dark-surface-secondary);
        z-index: -1;
    }

    & + li:after {
        background-color: ${props =>
            styleBackgroundDivider[props.stageSituation]};
    }

    &:first-child:after {
        content: none;
    }
`;

export { SaleStagesContainer, StepsContainer, StepsItem };
