
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

const validateUserFromServer: GetServerSideProps = async (context) => {
    if (!context.req.headers.cookie) return {
        redirect: { destination: '/index.html', permanent: false }
    };
    let address = cookie.parse(context.req.headers.cookie).userWalletAddress;
    let token = cookie.parse(context.req.headers.cookie).token;

    const walletaddress =
        !(address === undefined ||
            address === '' ||
            address === null);
    const userId =
        !(token === undefined ||
            token === '' ||
            token === null);

    if (walletaddress && !userId) return { props: {} };

    const userExist = await fetch(process.env.BASE_URL + '/api/user', {
        headers: { Authorization: token }
    });

    if (walletaddress && userExist) return {
        redirect: {
            destination: '/accounts',
            permanent: false
        }
    };

    return {
        redirect: {
            destination: '/create',
            permanent: false
        }
    };
};

export default validateUserFromServer;