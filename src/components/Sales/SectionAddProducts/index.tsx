import router from 'next/router';

import { Product } from '../../../@types';
import { formatInReal } from '../../../utils/formatInReal';
import { Button } from '../../Buttons';
import { ProductsList } from '../../ProductsList';
import {
    AddProductsActions,
    AddProductsContainer,
    AddProductsFooter,
    AddProductsTotalSale,
} from './styles';

interface ISectionAddProductsProps {
    listProducts: Product[];
    totalSale: number;
    handleSelectedProductList: (product: Product) => void;
    updateStage: (currentStage: number) => void;
}

function SectionAddProducts({
    listProducts,
    totalSale,
    handleSelectedProductList,
    updateStage,
}: ISectionAddProductsProps) {
    return (
        <AddProductsContainer>
            <ProductsList
                saleProducts={listProducts}
                handleSelectedProductList={handleSelectedProductList}
            ></ProductsList>

            <AddProductsFooter>
                <AddProductsTotalSale>
                    <p>Valor total</p>
                    <p className="value">{formatInReal(totalSale)}</p>
                </AddProductsTotalSale>
                <AddProductsActions>
                    <Button type="cancel" onClick={() => router.push('/sales')}>
                        <p>Cancelar</p>
                    </Button>
                    <Button onClick={() => updateStage(2)}>
                        <p>Próxima etapa</p>
                    </Button>
                </AddProductsActions>
            </AddProductsFooter>
        </AddProductsContainer>
    );
}

export { SectionAddProducts };
