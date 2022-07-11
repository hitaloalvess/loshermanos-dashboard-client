import Image from 'next/image';
import { Minus, Plus } from 'phosphor-react';
import { useState } from 'react';

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
    handleSelectedProductList: (product: Product) => void;
}

function ProductCardForSales({
    product,
    handleSelectedProductList,
}: IProductCardProps) {
    const [count, setCount] = useState<number>(product.amount || 0);

    function updateProductQuantity(operation: 'add' | 'remove') {
        let newAmout = 0;

        if (operation === 'add') {
            setCount(count + 1);

            newAmout = count + 1;
        } else {
            setCount(count - 1);
            newAmout = count - 1;
        }

        const newProduct = {
            ...product,
            amount: newAmout,
        };

        handleSelectedProductList(newProduct);
    }

    return (
        <ProductCardContainer>
            <ProductCardBanner isCardForSales>
                <Image
                    src={product.url}
                    alt="imagem do card do produto"
                    layout="fill"
                    priority={!!product.id}
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
                    <SalesCardButton
                        onClick={async () => {
                            updateProductQuantity('remove');
                        }}
                    >
                        <Minus />
                    </SalesCardButton>

                    <SalesCardCount>{count}</SalesCardCount>

                    <SalesCardButton
                        onClick={async () => {
                            updateProductQuantity('add');
                        }}
                    >
                        <Plus />
                    </SalesCardButton>
                </>
            </ProductCardActionsForSales>
        </ProductCardContainer>
    );
}

export { ProductCardForSales };
