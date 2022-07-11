import Image from 'next/image';
import { Minus, Plus, ShoppingCart } from 'phosphor-react';

import { Product } from '../../../@types';
import { formatInReal } from '../../../utils/formatInReal';
import { Button } from '../../Buttons';
import {
    MyCartItemButton,
    MyCartItemCounter,
    MyCartItemImage,
    MyCartItemTitle,
    MyCartItemTotal,
    SectionMyCartContainer,
    SectionMyCartFooter,
    SectionMyCartFooterActions,
    SectionMyCartFooterTotal,
    SectionMyCartItem,
    SectionMyCartItems,
    SectionMyCartTitle,
} from './styles';

interface ISectionMyCart {
    listProducts: Product[];
    totalSale: number;
    updateStage: (currentStage: number) => void;
    handleSelectedProductList: (product: Product) => void;
}

function SectionMyCart({
    listProducts,
    totalSale,
    updateStage,
    handleSelectedProductList,
}: ISectionMyCart) {
    function updateProductQuantity(
        operation: 'add' | 'remove',
        product: Product,
    ) {
        if (operation === 'add') {
            handleSelectedProductList({
                ...product,
                amount: Number(product.amount) + 1,
            });

            return;
        }

        if (Number(product.amount) - 1 > 0) {
            handleSelectedProductList({
                ...product,
                amount: Number(product.amount) - 1,
            });

            return;
        }

        handleSelectedProductList({
            ...product,
            amount: 0,
        });
    }

    return (
        <SectionMyCartContainer>
            <SectionMyCartTitle>
                <ShoppingCart />
                <h3>Carrinho de compras</h3>
            </SectionMyCartTitle>

            <SectionMyCartItems>
                <thead>
                    <tr>
                        <th></th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts &&
                        listProducts.map(product => (
                            <SectionMyCartItem key={product.id}>
                                <MyCartItemImage>
                                    <Image
                                        src={product.url}
                                        alt={`Image da ${product.url} contido no carrinho`}
                                        loading="lazy"
                                        layout="fill"
                                    />
                                </MyCartItemImage>
                                <MyCartItemTitle>
                                    <p>{product.description}</p>
                                </MyCartItemTitle>
                                <MyCartItemCounter>
                                    <MyCartItemButton
                                        onClick={() =>
                                            updateProductQuantity(
                                                'remove',
                                                product,
                                            )
                                        }
                                    >
                                        <Minus />
                                    </MyCartItemButton>

                                    <p>{Number(product.amount)}</p>

                                    <MyCartItemButton
                                        onClick={() =>
                                            updateProductQuantity(
                                                'add',
                                                product,
                                            )
                                        }
                                    >
                                        <Plus />
                                    </MyCartItemButton>
                                </MyCartItemCounter>

                                <MyCartItemTotal>
                                    <p>
                                        {formatInReal(
                                            product.price *
                                                Number(Number(product.amount)),
                                        )}
                                    </p>
                                </MyCartItemTotal>
                            </SectionMyCartItem>
                        ))}
                </tbody>
            </SectionMyCartItems>

            <SectionMyCartFooter>
                <SectionMyCartFooterTotal>
                    <p>Valor total</p>
                    <p className="value">{formatInReal(totalSale)}</p>
                </SectionMyCartFooterTotal>
                <SectionMyCartFooterActions>
                    <Button type="cancel" onClick={() => updateStage(1)}>
                        <p>Voltar</p>
                    </Button>
                    <Button onClick={() => updateStage(3)}>
                        <p>Próxima etapa</p>
                    </Button>
                </SectionMyCartFooterActions>
            </SectionMyCartFooter>
        </SectionMyCartContainer>
    );
}

export { SectionMyCart };
