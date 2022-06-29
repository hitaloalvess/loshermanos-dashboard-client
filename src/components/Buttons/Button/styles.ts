import styled from 'styled-components';

interface IButtonContainerProps {
    typeButton?: 'edit' | 'delete' | 'payment' | 'cancel';
}

const ButtonContainer = styled.button<IButtonContainerProps>`
    display: inline-flex;
    align-items: center;
    gap: 0 0.4rem;
    padding: 0.8rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 400;
    border-radius: 5px;
    border: none;
    color: var(--white);
    background-color: ${props => {
        switch (props.typeButton) {
            case 'edit':
                return `var(--yellow)`;

            case 'delete':
                return `var(--red)`;

            case 'payment':
                return `var(--green)`;
            case 'cancel':
                return `var(--dark-surface-secondary)`;

            default:
                return `var(--orange)`;
        }
    }};
    transition: filter 0.3s ease-in-out;

    svg {
        width: 1.6rem;
        height: 1.6rem;
    }

    p {
        font-size: 1.4rem;
    }

    &:hover {
        filter: brightness(0.85);
    }

    @media (max-width: 480px) {
        svg + p {
            display: none;
        }
    }
`;

export { ButtonContainer };
