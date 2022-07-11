import { ReactElement } from 'react';

import { Product } from '../../@types';
import { ProductCard } from './Cards/ProductCard';
import { ProductCardForSales } from './Cards/ProductCardForSale';
import { ProductsListContainer, ProductsListContent } from './styles';

interface IProductsListProps {
    products?: Product[];
    saleProducts?: Product[];
    funUpdateProduct?: (product: Product) => void;
    funDeleteProduct?: (product: Product) => void;
    handleSelectedProductList: (product: Product) => void;
    children?: ReactElement;
}

function ProductsList({
    products,
    saleProducts,
    funUpdateProduct,
    funDeleteProduct,
    handleSelectedProductList,
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
                                    handleSelectedProductList={
                                        handleSelectedProductList
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
