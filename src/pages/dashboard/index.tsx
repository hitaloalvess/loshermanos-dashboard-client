import { GetServerSideProps } from 'next';

import { User } from '../../@types';
import { PageContainer } from '../../components';
import {
    MonthlyBalance,
    SummaryItem,
    TopSellingProducts,
} from '../../components/Dashboard';
import { getProductsServerSide } from '../../hooks/useProducts';
import { getSalesServerSide } from '../../hooks/useSales';
import {
    calculateDailyTotal,
    calculateMonthlyTotal,
    calculateTotalMonthlyOrders,
    generateBalance,
    generateProductBestsellerList,
} from '../../utils/dashboardCalcs';
import { extractUserDataCookie } from '../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../utils/withSSRAuth';
import {
    ContentDashboard,
    ContentDashboardHeader,
    DashboardGraphicsContainer,
    SummaryContainer,
} from './styles';

type monthlyBalanceType = {
    [key: string]: object;
};

type bestSellingProduct = {
    name: string;
    amount: number;
};

interface IDashboardProps {
    loggedUser: User;
    dailyTotal: string;
    monthlyTotal: string;
    numberOfMonthlyOrders: string;
    monthlyBalanceData: monthlyBalanceType[];
    productBestsellerList: bestSellingProduct[];
}

export default function Dashboard({
    loggedUser,
    dailyTotal,
    monthlyTotal,
    numberOfMonthlyOrders,
    monthlyBalanceData,
    productBestsellerList,
}: IDashboardProps) {
    return (
        <PageContainer userName={loggedUser.name}>
            <ContentDashboard>
                <ContentDashboardHeader>
                    <h1>Dashboard</h1>
                </ContentDashboardHeader>

                <DashboardGraphicsContainer>
                    <SummaryContainer>
                        <SummaryItem
                            title="Total arrecadado no dia"
                            value={dailyTotal}
                        />
                        <SummaryItem
                            title="Total arrecadado no mês"
                            value={monthlyTotal}
                        />
                        <SummaryItem
                            title="Total de pedidos no mês"
                            value={numberOfMonthlyOrders}
                        />
                    </SummaryContainer>

                    <MonthlyBalance balance={monthlyBalanceData} />

                    <TopSellingProducts productsList={productBestsellerList} />
                </DashboardGraphicsContainer>
            </ContentDashboard>
        </PageContainer>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
    const currentDate = new Date().toString();

    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);
    const sales = await getSalesServerSide(user.id_account, ctx);
    const products = await getProductsServerSide(user.id_account, ctx);

    const dailyTotal = calculateDailyTotal(currentDate, sales);
    const monthlyTotal = calculateMonthlyTotal(currentDate, sales);
    const numberOfMonthlyOrders = calculateTotalMonthlyOrders(
        currentDate,
        sales,
    );
    const balance = generateBalance(sales);
    const productBestsellerList = generateProductBestsellerList(
        sales,
        products,
    );

    return {
        props: {
            loggedUser: { ...user },
            dailyTotal,
            monthlyTotal,
            numberOfMonthlyOrders,
            monthlyBalanceData: balance,
            productBestsellerList,
        },
    };
});
