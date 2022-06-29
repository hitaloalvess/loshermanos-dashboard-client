import styled from 'styled-components';

interface IFormRegisterRowProps {
    countItens: number;
}

const FormContainer = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.4rem 0;
    form {
        display: flex;
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

const FormTitle = styled.h1`
    text-align: center;
    font-size: 3.6rem;
    font-weight: bold;
    line-height: 4.8rem;
    color: var(--orange);

    @media (max-width: 468px) {
        font-size: 2.4rem;
    }
`;

const FormRow = styled.div<IFormRegisterRowProps>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.countItens}, 1fr)`};
    gap: 0 2.4rem;

    @media (max-width: 468px) {
        display: flex;
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;
export { FormContainer, FormTitle, FormRow };
