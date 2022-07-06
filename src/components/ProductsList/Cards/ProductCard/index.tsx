import { Minus, PencilSimple, Plus, Trash } from 'phosphor-react';

import { Product, SaleProduct } from '../../../../@types';
import { formatInReal } from '../../../../utils/formatInReal';
import { Button } from '../../../Buttons';
import {
    ProductCardActions,
    ProductCardBanner,
    ProductCardContainer,
    ProductCardPrice,
    ProductCardTitle,
} from '../styles';

interface IProductCardProps {
    product: Product | SaleProduct;
    funUpdateProduct?: (product: Product) => void;
    funDeleteProduct?: (product: Product) => void;
}

function ProductCard({
    product,
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

            <ProductCardActions>
                {funDeleteProduct && funUpdateProduct && (
                    <>
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
                    </>
                )}
            </ProductCardActions>
        </ProductCardContainer>
    );
}

export { ProductCard };