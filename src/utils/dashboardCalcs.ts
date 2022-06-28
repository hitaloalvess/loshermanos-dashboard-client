/* eslint-disable no-prototype-builtins */
import { Product, Sale } from '../@types';
import { formatInReal } from './formatInReal';

function calculateDailyTotal(currentDate: string, sales: Sale[]) {
    const currentDay = new Date(currentDate).getDate();

    const salesOfTheDay = sales.filter(
        (sale: Sale) =>
            new Date(sale.created_at as string).getDate() === currentDay &&
            sale.sale_type === 'PAID_OUT',
    );

    const total = salesOfTheDay?.reduce((acc: number, sale: Sale) => {
        return acc + sale.total;
    }, 0);

    return formatInReal(total);
}

function calculateMonthlyTotal(currentDate: string, sales: Sale[]) {
    const currentMonth = new Date(currentDate).getMonth();

    const salesOfTheDay = sales.filter(
        (sale: Sale) =>
            new Date(sale.created_at as string).getMonth() === currentMonth &&
            sale.sale_type === 'PAID_OUT',
    );
    const total = salesOfTheDay?.reduce((acc: number, sale: Sale) => {
        return acc + Number(sale.total);
    }, 0);

    return formatInReal(total);
}

function calculateTotalMonthlyOrders(currentDate: string, sales: Sale[]) {
    const currentMonth = new Date(currentDate).getMonth();

    const salesOfTheDay = sales.filter(
        (sale: Sale) =>
            new Date(sale.created_at as string).getMonth() === currentMonth,
    );

    return `${salesOfTheDay.length}`;
}

function generateBalance(sales: Sale[]) {
    let months: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const sale of sales) {
        const month = new Date(sale.created_at as string).getMonth();
        const day = new Date(sale.created_at as string).getDate();
        const monthExists = months.hasOwnProperty(month);

        if (!monthExists) {
            months = {
                ...months,
                [`${month}`]: { [day]: sale.total },
            };
        } else {
            let newMonths = {};
            const currentMonth = months[month];

            // eslint-disable-next-line no-unused-expressions
            currentMonth[day]
                ? (newMonths = {
                      ...months,
                      [month]: {
                          ...currentMonth,
                          [day]: Number(currentMonth[day]) + sale.total,
                      },
                  })
                : (newMonths = {
                      ...months,
                      [month]: {
                          ...currentMonth,
                          [day]: sale.total,
                      },
                  });

            months = newMonths;
        }
    }

    return Object.entries(months).map(item => {
        return {
            month: item[0],
            data: item[1],
        };
    });
}

function generateProductBestsellerList(sales: Sale[], products: Product[]) {
    const productsListDefault: any = products.reduce(
        (acc, product: Product) => {
            return {
                ...acc,
                [product.description]: { name: product.description, amount: 0 },
            };
        },
        {},
    );

    const productsListSold = sales.reduce((acc: Product[], sale: Sale) => {
        return [...acc, ...(sale.products as Product[])];
    }, []);

    let productsList = productsListDefault;

    // eslint-disable-next-line no-restricted-syntax
    for (const product of productsListSold) {
        const currentProduct = productsList[product.description];

        if (currentProduct.amount === 0) {
            productsList = {
                ...productsList,
                [product.description]: {
                    ...currentProduct,
                    amount: product.amount,
                },
            };
        }

        productsList = {
            ...productsList,
            [product.description]: {
                ...currentProduct,
                amount: currentProduct.amount + product.amount,
            },
        };
    }
    return Object.values(productsList).sort((a: any, b: any) => {
        return b.amount - a.amount;
    });
}

export {
    calculateDailyTotal,
    calculateMonthlyTotal,
    calculateTotalMonthlyOrders,
    generateBalance,
    generateProductBestsellerList,
};
