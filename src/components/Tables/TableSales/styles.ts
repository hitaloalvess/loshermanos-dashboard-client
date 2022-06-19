import styled from 'styled-components';

interface IStatusContainerProps {
    type: 'PENDING' | 'PAID_OUT';
}

const StatusContainer = styled.div<IStatusContainerProps>`
    max-width: 10rem;
    margin: 0 auto;
    padding: 1.2rem 0;
    border-radius: 100px;
    background-color: ${props =>
        props.type === 'PENDING'
            ? `var(--red-transparent)`
            : `var(--green-transparent)`};
    p {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${props =>
            props.type === 'PENDING' ? `var(--red)` : `var(--green)`};
    }
`;

export { StatusContainer };
