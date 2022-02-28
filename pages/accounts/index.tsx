import useUser from '@hooks/context_providers/useUser';
import React, { memo, useEffect } from 'react';
import Container from 'styled/Container';
import AccountHeading from '@components/AccountHeading';
import styled from 'styled-components';
import Text from 'styled/Text';
import { TealButton } from 'styled/Button';
import Row from 'styled/Row';
import Link from 'next/link';
import AccountStore from '@components/AccountStore';
import Footer from '@components/Footer';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';

function Accounts() {
    const { getUser, user, setUser } = useUser();
    const { data, goFetch, error, success } = getUser();
    const router = useRouter();

    useEffect(() => {
        goFetch();
    }, []);

    useEffect(() => {
        if (success) setUser(data);
        if (error) router.replace('/index.html');
    }, [success, data, error]);

    return !user
        ? <> <Text as='h1' align='center' py={2}> iKeep... </Text> </>
        : <>
            <Head> <title> Hello {user.nickname} </title> </Head>
            <Container width='min(600px, 90vw)' py={2}>
                <AccountHeading avatar={user.avatar} nickname={user.nickname} />

                {user.accounts.length === 0 ?
                    <NoAccounts>
                        <Text as='h1' color='#788cb37f' > no accounts stored yet </Text>
                        <Text as='h3' mb={1} mt={2}> Store and Secure your Accounts with us. </Text>
                        <Text> Click the button below to add account details you want to store in the system. Make sure you know your decrypting pin before adding an account. </Text>
                    </NoAccounts>
                    :
                    <HasAccounts>
                        {user.accounts.map(({ account_name, id }: any, index: number) => (
                            <Link href={`/accounts/${id}`} passHref key={index}>
                                <TealButton> {account_name} </TealButton>
                            </Link>
                        ))}
                    </HasAccounts>
                }
                <Row horizontalAlignment='center' gap='1rem' my={2} pb={1}>
                    <AccountStore numberOfAccounts={user.accounts.length} />
                    <Link href='/accounts/add' passHref>
                        <TealButton> Add account </TealButton>
                    </Link>
                </Row>

                <Footer />

            </Container>
        </>;
}

const NoAccounts = styled.div`
    background: rgba(142, 179, 255, 0.05);
    border: 1px solid rgba(53, 45, 112, 0.43);
    box-sizing: border-box;
    border-radius: 11px;
    padding: 2rem;
    margin: 1rem 0;
`;

const HasAccounts = styled.div`
    background: rgba(142, 179, 255, 0.05);
    border: 1px solid rgba(53, 45, 112, 0.43);
    border-radius: 11px;
    padding: 1.5rem;
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

export default memo(Accounts);