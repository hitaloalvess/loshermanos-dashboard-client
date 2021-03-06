import styled from 'styled-components';

const Container = styled.main`
    padding-left: 24.5rem;

    @media (max-width: 768px) {
        padding-left: 0;
    }
`;

const ContentContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 8rem;

    @media (max-width: 768px) {
        padding: 0 4rem;
    }
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    height: 8rem;

    .welcome {
        margin-left: auto;

        p {
            display: flex;
            gap: 0 0.4rem;
            span {
                color: var(--orange);
            }
        }
    }
`;

const Content = styled.section`
    padding: 0 0 2.4rem 0;
`;

export { Container, ContentContainer, Header, Content };
