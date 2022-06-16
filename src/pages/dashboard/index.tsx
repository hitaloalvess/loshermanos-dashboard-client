import { GetServerSideProps } from 'next';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

import { User } from '../../@types';
import { PageContainer } from '../../components';
import { getUsersServerSide } from '../../hooks/useUsers';
import { setupClient } from '../../services/apiAuth';
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

    return {
        props: {
            loggedUser: { ...user },
        },
    };
});
