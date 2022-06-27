import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Customer, Product, Sale, User } from '../../../@types';
import { PageContainer } from '../../../components';
import {
    SaleInformationSection,
    SaleSteps,
    SectionAddProducts,
    SectionMyCart,
} from '../../../components/Sales';
import { getCustomersServerSide } from '../../../hooks/useCustomers';
import { getProductsServerSide } from '../../../hooks/useProducts';
import { getSalesByIdServerSide } from '../../../hooks/useSales';
import { extractUserDataCookie } from '../../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { ContentUpdateSale, ContentUpdateSaleHeader } from './styles';

interface IUpdateSale {
    loggedUser: User;
    sale: Sale;
    products: Product[];
    customers: Customer[];
}

export default function UpdateSale({
    loggedUser,
    sale,
    customers,
    products,
}: IUpdateSale) {
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [listProducts, setListProducts] = useState<Product[]>([]);
    const [listSelectedProducts, setListSelectedProducts] = useState<Product[]>(
        sale.products as Product[],
    );

    useEffect(() => {
        const listProducts = products.map(product => {
            const productExist = listSelectedProducts.find(
                elem => elem.id === product.id,
            );

            return {
                ...product,
                amount: productExist ? productExist.amount : 0,
            };
        });
        setListProducts(listProducts);
    }, [products]);

    const totalSale = useMemo(() => {
        const total = listSelectedProducts.reduce((total, product) => {
            return total + product.price * Number(product.amount);
        }, 0);

        return total;
    }, [listSelectedProducts]);

    function updateListProducts(product: Product) {
        const newList = listProducts?.map(elem => {
            if (elem.id === product.id) {
                return {
                    ...elem,
                    amount: product.amount,
                };
            }
            return elem;
        });
        setListProducts(newList);
    }

    const addProductFromSelectedList = useCallback(
        (product: Product) => {
            const index = listSelectedProducts?.findIndex(
                elem => elem.id === product.id,
            );

            if (index >= 0) {
                const newListProducts = listSelectedProducts.map((elem, i) => {
                    return i === index
                        ? { ...elem, amount: product.amount }
                        : elem;
                });

                setListSelectedProducts(newListProducts);
            } else {
                setListSelectedProducts([...listSelectedProducts, product]);
            }

            updateListProducts(product);
        },
        [listSelectedProducts, listProducts],
    );

    const removeProductFromSelectedList = useCallback(
        (product: Product) => {
            const newList = listSelectedProducts.filter(
                elem => elem.id !== product.id,
            );
            setListSelectedProducts(newList);

            updateListProducts(product);
        },
        [listSelectedProducts, listProducts],
    );

    const updateStage = useCallback(
        (currentStage: number) => {
            if (currentStage > 1 && listSelectedProducts.length <= 0) {
                toast.error('Adicione um produto a lista de venda!');
                return;
            }

            setCurrentStage(currentStage);
        },
        [listSelectedProducts, currentStage],
    );

    return (
        <PageContainer userName={loggedUser.name}>
            <>
                <ContentUpdateSale>
                    <ContentUpdateSaleHeader>
                        <h1>Atualizar venda</h1>
                        <SaleSteps currentStage={currentStage} />
                    </ContentUpdateSaleHeader>

                    {currentStage === 1 && (
                        <SectionAddProducts
                            listProducts={listProducts as Product[]}
                            totalSale={totalSale}
                            funAddProduct={addProductFromSelectedList}
                            funRemoveProduct={removeProductFromSelectedList}
                            updateStage={updateStage}
                        />
                    )}

                    {currentStage === 2 && (
                        <SectionMyCart
                            listProducts={listSelectedProducts}
                            totalSale={totalSale}
                            updateStage={updateStage}
                            increaseProduct={addProductFromSelectedList}
                            decreaseProduct={removeProductFromSelectedList}
                        />
                    )}

                    {currentStage === 3 && (
                        <SaleInformationSection
                            defaultSale={sale}
                            customers={customers}
                            totalSale={totalSale}
                            saleProducts={listSelectedProducts}
                            updateStage={updateStage}
                        />
                    )}
                </ContentUpdateSale>
            </>
        </PageContainer>
    );
}

export const getServerSideProps = withSSRAuth(async ctx => {
    const { id } = ctx.query;
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    const products = await getProductsServerSide(user.id_account, ctx);

    const customers = await getCustomersServerSide(user.id_account, ctx);

    const sale = await getSalesByIdServerSide(id as string, ctx);

    const saleCustomer = customers.find(
        customer => customer.id === sale.id_customer,
    );

    return {
        props: {
            loggedUser: { ...user },
            products,
            customers,
            sale: {
                ...sale,
                customer: saleCustomer,
            },
        },
    };
});
