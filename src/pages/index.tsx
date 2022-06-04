import { AuthContainer, FormLogin } from '../components';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
    return (
        <AuthContainer sideImage="left" imageSrc="/images/bannerLogin.svg">
            <FormLogin />
        </AuthContainer>
    );
}

export const getServerSideProps = withSSRGuest(async () => {
    return {
        props: {},
    };
});
