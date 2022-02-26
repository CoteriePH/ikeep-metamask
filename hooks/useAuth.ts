import { GetServerSideProps, NextPage } from 'next';
import cookie from 'cookie';

export default function useAuth(Page: NextPage) {
    return Page;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.req.headers.cookie) return {
        redirect: { destination: '/index.html', permanent: false }
    };
    let ikeepSession = cookie.parse(context.req.headers.cookie).userWalletAddress;

    const userHasSession =
        !(ikeepSession === undefined ||
            ikeepSession === '' ||
            ikeepSession === null);

    if (userHasSession) return { props: {} };
    return {
        redirect: {
            destination: '/index.html',
            permanent: false
        }
    };
};   