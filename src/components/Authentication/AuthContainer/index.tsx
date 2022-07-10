import Image from 'next/image';
import { ReactElement } from 'react';

import { Banner, ContainerAuth, ContentAuth } from './styles';

interface IAuthContainerProps {
    imageSrc: string;
    sideImage: 'left' | 'right';
    children: ReactElement;
}
function AuthContainer({ imageSrc, sideImage, children }: IAuthContainerProps) {
    return (
        <ContainerAuth>
            <Banner sideImage={sideImage}>
                <Image
                    src={imageSrc}
                    alt="imagem do painel de authenticação"
                    loading="lazy"
                />
            </Banner>
            <ContentAuth contentSide={sideImage === 'left' ? 'right' : 'left'}>
                {children}
            </ContentAuth>
        </ContainerAuth>
    );
}

export { AuthContainer };
