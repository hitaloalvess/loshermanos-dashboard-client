import styled from 'styled-components';

const SectionCustomerInformationContainer = styled.section`
    margin: 0 auto;
`;

const SectionCustomerInformationContent = styled.div`
    width: 55rem;
    max-width: 60rem;

    @media (max-width: 480px) {
        max-width: 35rem;
    }
`;

export {
    SectionCustomerInformationContainer,
    SectionCustomerInformationContent,
};
