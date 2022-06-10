import { ReactElement, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContexts';
import { SideBar } from '../SideBar';
import { Container, Content, ContentContainer, Header } from './styles';

interface IPageContainerProps {
    userName: string;
    children: ReactElement;
}

function PageContainer({ userName, children }: IPageContainerProps) {
    return (
        <Container>
            <SideBar />
            <ContentContainer>
                <Header>
                    <div className="welcome">
                        <p>
                            Seja bem-vindo
                            <span>{userName}</span>
                        </p>
                    </div>
                </Header>
                <Content>{children}</Content>
            </ContentContainer>
        </Container>
    );
}

export { PageContainer };
