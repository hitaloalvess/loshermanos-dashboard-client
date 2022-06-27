import { Check } from 'phosphor-react';
import { useMemo } from 'react';

import {
    // SaleStepsItemTitle,
    // SaleStepsButton,
    // SaleStepsContainer,
    // SaleStepsItem,
    // SaleStepsDivider,
    SaleStagesContainer,
    StepsContainer,
    StepsItem,
} from './styles';

interface ISaleStepsProps {
    currentStage: number;
}

function SaleSteps({ currentStage }: ISaleStepsProps) {
    function styleTheCurrentStep(
        idStage: number,
    ): 'currentStage' | 'completedStage' | 'default' {
        if (currentStage === idStage) {
            return 'currentStage';
        }
        if (idStage < currentStage) {
            return 'completedStage';
        }
        return 'default';
    }

    return (
        <SaleStagesContainer>
            <StepsContainer>
                <StepsItem stageSituation={styleTheCurrentStep(1)}>
                    <p>Adicionar produtos</p>
                </StepsItem>
                <StepsItem stageSituation={styleTheCurrentStep(2)}>
                    <p>Meu carrinho</p>
                </StepsItem>
                <StepsItem stageSituation={styleTheCurrentStep(3)}>
                    <p>Informações da venda</p>
                </StepsItem>
            </StepsContainer>
        </SaleStagesContainer>
    );
}

export { SaleSteps };
