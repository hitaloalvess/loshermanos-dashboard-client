import { Product } from '../../@types';
import { ProductCard } from './ProductCard';
import { ProductsListContainer, ProductsListContent } from './styles';

interface IProductsListProps {
    products: Product[];
    funUpdateProduct: (product: Product) => void;
    funDeleteProduct: (product: Product) => void;
}

function ProductsList({
    products,
    funUpdateProduct,
    funDeleteProduct,
}: IProductsListProps) {
    return (
        <ProductsListContainer>
            <ProductsListContent>
                {products &&
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            funUpdateProduct={funUpdateProduct}
                            funDeleteProduct={funDeleteProduct}
                        />
                    ))}
            </ProductsListContent>
        </ProductsListContainer>
    );
}

export { ProductsList };
