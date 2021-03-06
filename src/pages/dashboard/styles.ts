import styled from 'styled-components';

const ContentDashboard = styled.main`
    display: flex;
    flex-direction: column;
    gap: 4.4rem 0;
`;

const ContentDashboardHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 3.6rem;
        font-weight: bold;
    }
`;

const DashboardGraphicsContainer = styled.section`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 12.8rem 1fr;
    grid-template-areas: 'summary summary summary' 'balance balance topSellingProducts';
    gap: 2.4rem;

    @media (max-width: 480px) {
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr;
        grid-template-areas: 'summary' 'balance' 'topSellingProducts';
    }
`;

const SummaryContainer = styled.div`
    grid-area: summary;
    display: flex;
    flex-direction: row;
    gap: 2.4rem;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

export {
    ContentDashboard,
    ContentDashboardHeader,
    DashboardGraphicsContainer,
    SummaryContainer,
};
