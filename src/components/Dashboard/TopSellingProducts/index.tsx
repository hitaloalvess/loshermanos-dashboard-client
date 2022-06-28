import {
    TopSellingProductsContainer,
    TopSellingProductsList,
    TopSellingProductsTitle,
} from './styles';

type bestSellingProductType = {
    name: string;
    amount: number;
};

interface ITopSellingProductsProps {
    productsList: bestSellingProductType[];
}

function TopSellingProducts({ productsList }: ITopSellingProductsProps) {
    return (
        <TopSellingProductsContainer>
            <TopSellingProductsTitle>Mais vendidos</TopSellingProductsTitle>
            <TopSellingProductsList>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.map(product => (
                        <tr key={product.name}>
                            <td>{product.name}</td>
                            <td>{product.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </TopSellingProductsList>
        </TopSellingProductsContainer>
    );
}

export { TopSellingProducts };
