import { GetServerSideProps } from 'next';
import React from 'react';
import cookie from 'cookie';

function Accounts() {
    return (
        <div>accounts</div>
    );
}

export default Accounts;

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.req.headers.cookie) return {
        redirect: { destination: '/index.html', permanent: false }
    };
    let token = cookie.parse(context.req.headers.cookie).token;

    const userId =
        !(token === undefined ||
            token === '' ||
            token === null);

    if (!userId) return {
        redirect: { destination: '/login', permanent: false }
    };
    return { props: {} };
};
