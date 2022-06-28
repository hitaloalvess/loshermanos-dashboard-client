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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 12.8rem 1fr;
    grid-template-areas: 'summary summary summary' 'balance balance topSellingProducts';
    gap: 2.4rem;
`;

const SummaryContainer = styled.div`
    grid-area: summary;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem;
`;

export {
    ContentDashboard,
    ContentDashboardHeader,
    DashboardGraphicsContainer,
    SummaryContainer,
};
