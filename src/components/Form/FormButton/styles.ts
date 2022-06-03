import styled from 'styled-components';

const FormButtonContainer = styled.button`
    width: 100%;
    padding: 1.6rem 0;
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    border-radius: 5px;
    color: var(--white);
    background-color: var(--orange);
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: var(--orange-transparent);
    }
`;

export { FormButtonContainer };
