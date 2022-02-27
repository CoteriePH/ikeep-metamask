import useUser from '@hooks/context_providers/useUser';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import Container from 'styled/Container';
import AccountHeading from '@components/AccountHeading';
import styled from 'styled-components';
import Text from 'styled/Text';
import { TealButton } from 'styled/Button';
import Row from 'styled/Row';
import Link from 'next/link';
import AccountStore from '@components/AccountStore';
import Footer from '@components/Footer';

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

            {!user.accounts.length && <>
                <Main>
                    <Text as='h1' color='#788cb37f' > no accounts stored yet </Text>
                    <Text as='h3' mb={1} mt={2}> Store and Secure your Accounts with us. </Text>
                    <Text> Click the button below to add account details you want to store in the system. Make sure you know your decrypting pin before adding an account. </Text>
                </Main>

                <Row horizontalAlignment='center' gap='1rem' my={2} pb={1}>
                    <AccountStore numberOfAccounts={user.accounts.length} />
                    <Link href='/account/add' passHref>
                        <TealButton> Add account </TealButton>
                    </Link>
                </Row>

                <Footer />
            </>}
        </Container>
    );
}

const Main = styled.div`
    background: rgba(142, 179, 255, 0.05);
    border: 1px solid rgba(53, 45, 112, 0.43);
    box-sizing: border-box;
    border-radius: 11px;
    padding: 2rem;
    margin: 1rem 0;
`;

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