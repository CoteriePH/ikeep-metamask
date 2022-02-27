import useUser from '@hooks/context_providers/useUser';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import Column from 'styled/Column';
import Container from 'styled/Container';
import AccountHeading from '@components/AccountHeading';

function Accounts({ _user }: any) {
    const { setUser, user } = useUser();

    useEffect(() => {
        if (_user) setUser(_user);
    }, [_user]);

    useEffect(() => {
        if (user) {

        }
    }, [user]);

    if (!user) return null;
    return (
        <Container width='min(600px, 90vw)' py={2}>
            <AccountHeading avatar={user.avatar} nickname={user.nickname} />
        </Container>
    );
}

export default Accounts;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const reCookie = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};
    if (reCookie) {
        const token = reCookie.token;
        if (!token) return { redirect: { destination: '/login', permanent: false } };
        const res = await fetch(process.env.BASE_URL + "/api/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
        });

        if (res.ok) {
            const user = await res.json();
            return { props: { _user: user } };
        }
    }

    return { props: {} };
};