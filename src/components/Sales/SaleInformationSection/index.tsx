import { Customer, Product, Sale } from '../../../@types';
import { RegisterForm } from '../../Form';
import { UpdateForm } from '../../Form/FormsSales/UpdateForm';
import {
    SectionCustomerInformationContainer,
    SectionCustomerInformationContent,
} from './styles';

interface ISaleInformationSection {
    defaultSale?: Sale;
    customers: Customer[];
    totalSale: number;
    saleProducts: Product[];
    updateStage: (currentStage: number) => void;
}

function SaleInformationSection({
    defaultSale,
    customers,
    totalSale,
    saleProducts,
    updateStage,
}: ISaleInformationSection) {
    return (
        <SectionCustomerInformationContainer>
            <SectionCustomerInformationContent>
                {!defaultSale && (
                    <RegisterForm
                        customers={customers}
                        saleProducts={saleProducts}
                        totalSale={totalSale}
                        updateStage={updateStage}
                    />
                )}

                {defaultSale && (
                    <UpdateForm
                        defaultSale={defaultSale}
                        customers={customers}
                        saleProducts={saleProducts}
                        totalSale={totalSale}
                        updateStage={updateStage}
                    />
                )}
            </SectionCustomerInformationContent>
        </SectionCustomerInformationContainer>
    );
}

export { SaleInformationSection };
