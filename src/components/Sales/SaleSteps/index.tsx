import { Check } from 'phosphor-react';
import { useMemo } from 'react';

import {
    SaleStepsItemTitle,
    SaleStepsButton,
    SaleStepsContainer,
    SaleStepsItem,
    SaleStepsDivider,
} from './styles';

interface ISaleStepsProps {
    currentStage: number;
    updateStage: (currentStage: number) => void;
}

function SaleSteps({ currentStage, updateStage }: ISaleStepsProps) {
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
        <SaleStepsContainer>
            <SaleStepsItem>
                <SaleStepsButton stageSituation={styleTheCurrentStep(1)}>
                    {styleTheCurrentStep(1) === 'completedStage' ? (
                        <Check />
                    ) : (
                        <p>1</p>
                    )}
                </SaleStepsButton>
                <SaleStepsItemTitle>Adicionar produtos</SaleStepsItemTitle>
            </SaleStepsItem>

            <SaleStepsDivider />

            <SaleStepsItem>
                <SaleStepsButton stageSituation={styleTheCurrentStep(2)}>
                    {styleTheCurrentStep(2) === 'completedStage' ? (
                        <Check />
                    ) : (
                        <p>2</p>
                    )}
                </SaleStepsButton>
                <SaleStepsItemTitle>Meu carrinho</SaleStepsItemTitle>
            </SaleStepsItem>

            <SaleStepsDivider />

            <SaleStepsItem>
                <SaleStepsButton stageSituation={styleTheCurrentStep(3)}>
                    {styleTheCurrentStep(3) === 'completedStage' ? (
                        <Check />
                    ) : (
                        <p>3</p>
                    )}
                </SaleStepsButton>
                <SaleStepsItemTitle>Informações da venda</SaleStepsItemTitle>
            </SaleStepsItem>
        </SaleStepsContainer>
    );
}

export { SaleSteps };
