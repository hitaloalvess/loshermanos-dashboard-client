import Image from 'next/image';
import { Minus, Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';

import { Product } from '../../../../@types';
import { formatInReal } from '../../../../utils/formatInReal';
import {
    ProductCardActionsForSales,
    ProductCardBanner,
    ProductCardContainer,
    ProductCardPrice,
    ProductCardTitle,
    SalesCardButton,
    SalesCardCount,
} from '../styles';

interface IProductCardProps {
    product: Product;
    funAddProduct: (product: Product) => void;
    funRemoveProduct: (product: Product) => void;
}

function ProductCardForSales({
    product,
    funAddProduct,
    funRemoveProduct,
}: IProductCardProps) {
    const [count, setCount] = useState<number>(product.amount || 0);

    useEffect(() => {
        const item = {
            ...product,
            amount: count,
        };

        if (count > 0) {
            funAddProduct(item);
        } else {
            funRemoveProduct(item);
        }
    }, [count, funAddProduct, funRemoveProduct, product]);

    return (
        <ProductCardContainer>
            <ProductCardBanner isCardForSales>
                <Image
                    src={product.url}
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
            <ProductCardActionsForSales>
                <>
                    <SalesCardButton onClick={() => setCount(count - 1)}>
                        <Minus />
                    </SalesCardButton>

                    <SalesCardCount>{product.amount}</SalesCardCount>

                    <SalesCardButton onClick={() => setCount(count + 1)}>
                        <Plus />
                    </SalesCardButton>
                </>
            </ProductCardActionsForSales>
        </ProductCardContainer>
    );
}

export { ProductCardForSales };
