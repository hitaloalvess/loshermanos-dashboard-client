import { Product, SaleProduct } from '../../../@types';
import { Button } from '../../Buttons';
import { ProductsList } from '../../ProductsList';
import {
    AddProductsActions,
    AddProductsContainer,
    AddProductsFooter,
    AddProductsTotalSale,
} from './styles';

interface ISectionAddProductsProps {
    listProducts: Product[] | SaleProduct[];
    funAddProduct: (product: SaleProduct) => void;
    funRemoveProduct: (product: SaleProduct) => void;
}

function SectionAddProducts({
    listProducts,
    funAddProduct,
    funRemoveProduct,
}: ISectionAddProductsProps) {
    return (
        <AddProductsContainer>
            <ProductsList
                saleProducts={listProducts}
                typeCard="cardForSales"
                funAddProduct={funAddProduct}
                funRemoveProduct={funRemoveProduct}
            ></ProductsList>

            <AddProductsFooter>
                <AddProductsTotalSale>
                    <p>Valor total</p>
                    <p className="value">R$100</p>
                </AddProductsTotalSale>
                <AddProductsActions>
                    <Button
                        type="cancel"
                        onClick={() => console.log('Cancelando')}
                    >
                        <p>Cancelar</p>
                    </Button>
                    <Button onClick={() => console.log('Next...')}>
                        <p>Próxima etapa</p>
                    </Button>
                </AddProductsActions>
            </AddProductsFooter>
        </AddProductsContainer>
    );
}

export { SectionAddProducts };
