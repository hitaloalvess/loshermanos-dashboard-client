import styled from 'styled-components';

interface IButtonToggleProps {
    isActive: boolean;
}

const ButtonToggle = styled.div<IButtonToggleProps>`
    display: none;
    position: relative;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    &::after,
    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 70%;
        height: 0.3rem;
        border-radius: 32px;
        transition: 0.5s ease;
        background-color: var(--white);
    }
    &::before {
        top: ${props => (props.isActive ? '50%' : '65%')};
        left: ${props => (props.isActive ? '50%' : '30%')};
        transform: ${props =>
            props.isActive && 'translate(-50%, -50%) rotate(135deg)'};
    }
    &::after {
        top: 35%;
        left: 0;
        top: ${props => (props.isActive ? '50%' : '35%')};
        left: ${props => (props.isActive ? '50%' : '0')};
        transform: ${props =>
            props.isActive && 'translate(-50%, -50%) rotate(-315deg)'};
    }
    /* &.active::after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(135deg);
    } */
    /* &.active::before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-315deg);
    } */

    @media (max-width: 768px) {
        display: block;
    }
`;

export { ButtonToggle };
