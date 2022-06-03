import styled from 'styled-components';

const InputSelectContainer = styled.div`
    position: relative;
    select {
        width: 100%;
        padding: 2.4rem 1.8rem;
        color: var(--text-secondary);
        border: 3px solid transparent;
        border-radius: 5px;
        appearance: none;
        background-color: var(--dark-surface-primary);

        &:hover,
        &:active,
        &:checked,
        &:focus {
            border-color: var(--orange);

            & + svg {
                color: var(--orange);
            }
        }
    }

    svg {
        position: absolute;
        top: 2.4rem;
        right: 2.4rem;
        width: 1.8rem;
        height: 1.8rem;
        color: var(--text-secondary);
    }
`;

export { InputSelectContainer };
