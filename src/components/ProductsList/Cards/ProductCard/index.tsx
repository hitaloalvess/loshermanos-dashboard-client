import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PencilSimple, Trash } from 'phosphor-react';
import { useContext } from 'react';

import { Product } from '../../../../@types';
import { AuthContext } from '../../../../contexts/AuthContexts';
import { formatInReal } from '../../../../utils/formatInReal';
import { Button } from '../../../Buttons';
import { IOnlyAdminAllowedProps } from '../../../OnlyAdminAllowed';
import {
    ProductCardActions,
    ProductCardBanner,
    ProductCardContainer,
    ProductCardPrice,
    ProductCardTitle,
} from '../styles';

const OnlyAdminAllowed = dynamic<IOnlyAdminAllowedProps>(
    () =>
        import('../../../OnlyAdminAllowed').then(
            ({ OnlyAdminAllowed }) => OnlyAdminAllowed,
        ),
    { ssr: false },
);

interface IProductCardProps {
    product: Product;
    funUpdateProduct?: (product: Product) => void;
    funDeleteProduct?: (product: Product) => void;
}

function ProductCard({
    product,
    funUpdateProduct,
    funDeleteProduct,
}: IProductCardProps) {
    const {
        user: { admin },
    } = useContext(AuthContext);

    return (
        <ProductCardContainer>
            <ProductCardBanner userIsAdmin={admin}>
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

            <OnlyAdminAllowed>
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
            </OnlyAdminAllowed>
        </ProductCardContainer>
    );
}

export { ProductCard };
