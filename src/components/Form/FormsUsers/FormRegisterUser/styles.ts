import styled from 'styled-components';

interface IFormRegisterRowProps {
    countItens: number;
}

const FormRegisterUserContainer = styled.section`
    width: 100%;
    /* max-width: 48rem; */
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3.2rem 0;
    /* margin: 4.4rem 0; */
    form {
        display: flex;
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

const FormRegisterUserTitle = styled.h1`
    text-align: center;
    font-size: 3.6rem;
    font-weight: bold;
    line-height: 4.8rem;
    color: var(--orange);
`;

const FormRegisterUserRow = styled.div<IFormRegisterRowProps>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.countItens}, 1fr)`};
    gap: 0 2.4rem;
`;

export {
    FormRegisterUserContainer,
    FormRegisterUserTitle,
    FormRegisterUserRow,
};
