import { ReactElement } from 'react';

import { Product, SaleProduct } from '../../@types';
import { ProductCard } from './Cards/ProductCard';
import { ProductCardForSales } from './Cards/ProductCardForSale';
import { ProductsListContainer, ProductsListContent } from './styles';

interface IProductsListProps {
    products?: Product[];
    saleProducts?: SaleProduct[];
    typeCard?: 'cardForSales' | undefined;
    funUpdateProduct?: (product: Product) => void;
    funDeleteProduct?: (product: Product) => void;
    funAddProduct?: (product: SaleProduct) => void;
    funRemoveProduct?: (product: SaleProduct) => void;
    children?: ReactElement;
}

function ProductsList({
    products,
    saleProducts,
    funUpdateProduct,
    funDeleteProduct,
    funAddProduct,
    funRemoveProduct,
    children,
}: IProductsListProps) {
    return (
        <ProductsListContainer>
            <ProductsListContent>
                {products ? (
                    <>
                        {products &&
                            products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    funUpdateProduct={funUpdateProduct}
                                    funDeleteProduct={funDeleteProduct}
                                />
                            ))}
                        {children}
                    </>
                ) : (
                    <>
                        {saleProducts &&
                            saleProducts.map(product => (
                                <ProductCardForSales
                                    key={product.id}
                                    product={product}
                                    funAddProduct={
                                        funAddProduct as (
                                            product: SaleProduct,
                                        ) => void
                                    }
                                    funRemoveProduct={
                                        funRemoveProduct as (
                                            product: SaleProduct,
                                        ) => void
                                    }
                                />
                            ))}
                        {children}
                    </>
                )}
            </ProductsListContent>
        </ProductsListContainer>
    );
}

export { ProductsList };
