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
`;

const FormDeleteSubtitle = styled.p`
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--white);
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
