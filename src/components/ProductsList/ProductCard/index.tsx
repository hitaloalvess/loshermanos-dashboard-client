import { PencilSimple, Trash } from 'phosphor-react';

import { Product } from '../../../@types';
import { formatInReal } from '../../../utils/formatInReal';
import { Button } from '../../Buttons';
import {
    ProductCardActions,
    ProductCardActionsForSales,
    ProductCardBanner,
    ProductCardContainer,
    ProductCardPrice,
    ProductCardTitle,
} from './styles';

interface IProductCardProps {
    product: Product;
    cardForSales?: boolean;
    funUpdateProduct: (product: Product) => void;
    funDeleteProduct: (product: Product) => void;
}

function ProductCard({
    product,
    cardForSales,
    funUpdateProduct,
    funDeleteProduct,
}: IProductCardProps) {
    return (
        <ProductCardContainer>
            <ProductCardBanner>
                <img
                    src={`${process.env.BASE_URL_IMAGE_LOCAL}/${product.image_name}`}
                    alt="imagem do card do produto"
                    loading="lazy"
                />
                <ProductCardPrice>
                    <p>{`${formatInReal(product.price)}`}</p>
                </ProductCardPrice>
                <ProductCardTitle>
                    <h3>{product.description}</h3>
                </ProductCardTitle>
            </ProductCardBanner>

            {cardForSales ? (
                <ProductCardActionsForSales></ProductCardActionsForSales>
            ) : (
                <ProductCardActions>
                    <Button
                        type="edit"
                        onClick={() => funUpdateProduct(product)}
                    >
                        <PencilSimple />
                    </Button>
                    <Button
                        type="delete"
                        onClick={() => funDeleteProduct(product)}
                    >
                        <Trash />
                    </Button>
                </ProductCardActions>
            )}
        </ProductCardContainer>
    );
}

export { ProductCard };
