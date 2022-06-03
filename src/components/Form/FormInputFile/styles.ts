import styled from 'styled-components';

const InputFileContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .inputFile {
        label {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 2.4rem 2.4rem;
            border-radius: 5px;
            cursor: pointer;
            background-color: var(--dark-surface-primary);

            svg {
                width: 4.8rem;
                height: 4.8rem;
                color: var(--grey-medium);
                margin-bottom: 1.2rem;
                /* &.iconAlert {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 2.4rem;
                    height: 2.4rem;
                } */
            }

            p {
                font-size: 1.4rem;
                text-align: center;
                font-weight: 500;
                color: var(--grey-medium);
            }
        }

        input[type='file'] {
            display: none;
        }

        .imgUpload {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
        }
    }

    /* &.displayError {
        position: relative;
        svg.iconAlert {
            margin-left: auto;
            right: 0;
            color: var(--red);
        }
        label {
            border: 1px solid var(--red);
        }
        .messageError {
            position: absolute;
            top: -2rem;
            left: 0;
            width: 100%;
            text-align: center;
            p {
                font-size: 1.2rem;
                font-weight: 400;
                color: var(--red);
            }
        }
    } */
`;

export { InputFileContainer };
