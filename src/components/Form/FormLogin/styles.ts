import styled from 'styled-components';

const FormLoginContainer = styled.section`
    width: 100%;
    max-width: 40rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6.4rem 0;

    form {
        display: flex;
        flex-direction: column;
        gap: 2.4rem 0;
    }
`;

const FormLoginTitle = styled.h1`
    font-size: 3.6rem;
    font-weight: bold;
    line-height: 4.8rem;
`;

const RegisterNow = styled.div`
    display: flex;
    justify-content: center;
    gap: 0 0.8rem;

    p,
    a {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.6rem;
    }

    a {
        color: var(--orange);
        transition: color 0.3s ease-in-out;

        &:hover {
            color: var(--orange-transparent);
        }
    }
`;

export { FormLoginContainer, FormLoginTitle, RegisterNow };
