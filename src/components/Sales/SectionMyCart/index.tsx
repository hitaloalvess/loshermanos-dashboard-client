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
    decreaseProduct: (product: Product) => void;
    increaseProduct: (product: Product) => void;
}

function SectionMyCart({
    listProducts,
    totalSale,
    updateStage,
    decreaseProduct,
    increaseProduct,
}: ISectionMyCart) {
    function increaseQuantityOfProduct(product: Product) {
        increaseProduct({
            ...product,
            amount: Number(product.amount) + 1,
        });
    }

    function decreaseQuantityOfProduct(product: Product) {
        if (Number(product.amount) - 1 > 0) {
            decreaseProduct({
                ...product,
                amount: Number(product.amount) - 1,
            });
        } else {
            decreaseProduct({
                ...product,
                amount: 0,
            });
        }
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
                                    <img
                                        src={`${process.env.BASE_URL_IMAGE_LOCAL}/${product.image_name}`}
                                        alt={`Image da ${product.description} contido no carrinho`}
                                    />
                                </MyCartItemImage>
                                <MyCartItemTitle>
                                    <p>{product.description}</p>
                                </MyCartItemTitle>
                                <MyCartItemCounter>
                                    <MyCartItemButton
                                        onClick={() =>
                                            decreaseQuantityOfProduct(product)
                                        }
                                    >
                                        <Minus />
                                    </MyCartItemButton>

                                    <p>{Number(product.amount)}</p>

                                    <MyCartItemButton
                                        onClick={() =>
                                            increaseQuantityOfProduct(product)
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
