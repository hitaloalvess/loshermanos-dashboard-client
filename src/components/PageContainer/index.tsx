import { ReactElement, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContexts';
import { SideBar } from '../SideBar';
import { Container, Content, ContentContainer, Header } from './styles';

interface IPageContainerProps {
    children: ReactElement;
}

function PageContainer({ children }: IPageContainerProps) {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <SideBar />
            <ContentContainer>
                <Header>
                    <div className="welcome">
                        <p>
                            Seja bem-vindo
                            <span>{user.name}</span>
                        </p>
                    </div>
                </Header>
                <Content>{children}</Content>
            </ContentContainer>
        </Container>
    );
}

export { PageContainer };
