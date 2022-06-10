import { GetServerSideProps } from 'next';

import { User } from '../../@types';
import { PageContainer } from '../../components';
import { getUsersServerSide } from '../../hooks/useUsers';
import { extractUserDataCookie } from '../../utils/extractUserDataCookie';
import { withSSRAuth } from '../../utils/withSSRAuth';

interface IDashboardProps {
    loggedUser: User;
}

export default function Dashboard({ loggedUser }: IDashboardProps) {
    return (
        <PageContainer userName={loggedUser.name}>
            <></>
        </PageContainer>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
    const { user } = extractUserDataCookie('@LosHermanosDash.token', ctx);

    const users = await getUsersServerSide(user.id_account, ctx);

    return {
        props: {
            loggedUser: { ...user },
        },
    };
});
