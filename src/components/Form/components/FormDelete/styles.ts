import styled from 'styled-components';

const FormDeleteContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.2rem 0;
`;

const FormDeleteTitle = styled.h1`
    text-align: center;
    font-size: 3.6rem;
    font-weight: bold;
    line-height: 4.8rem;
    color: var(--orange);

    @media (max-width: 480px) {
        font-size: 2.8rem;
    }
`;

const FormDeleteSubtitle = styled.p`
    text-align: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--white);

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const FormDeleteActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 0 1.2rem;
    margin-top: 2.4rem;
`;

export {
    FormDeleteContainer,
    FormDeleteTitle,
    FormDeleteSubtitle,
    FormDeleteActions,
};
