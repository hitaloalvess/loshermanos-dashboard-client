import styled from 'styled-components';

const FormSignUpContainer = styled.section`
    width: 100%;
    max-width: 40rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3.2rem 0;
    margin: 4.4rem 0;
    form {
        display: flex;
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

const FormSignUpBackButton = styled.a`
    svg {
        width: 1.8rem;
        height: 1.8rem;
        color: var(--text-secondary);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--orange);
        }
    }
`;

const FormSignUpTitle = styled.h1`
    font-size: 3.6rem;
    font-weight: bold;
    line-height: 4.8rem;
`;

export { FormSignUpContainer, FormSignUpBackButton, FormSignUpTitle };
