import { GetServerSideProps } from "next";
import cookie from 'cookie';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from "next/router";
import useUser from "@hooks/context_providers/useUser";
import Container from "@styled/Container";
import { BigHeader } from "../add";
import Text from "@styled/Text";
import Row from "@styled/Row";
import TextInput from "@styled/TextInput";
import { TextInputEvent } from "@lib/types";
import { BlueButton, DangerButton } from "@styled/Button";
import Footer from "@components/Footer";
import { decrypt } from "pages/api/account/add";
import useFetch from "@hooks/useFetch";
import { getCookie } from "@util/cookie";
import Spinner from "@components/spinner";


export default function Edit({ account }: { account: any; }) {

    const [username_email, setUsername_email] = useState(() => account.username_email);
    const [password, setPassword] = useState(() => account.password);

    const router = useRouter();

    const { data, error, loading, goFetch } = useFetch('/api/account/update', {
        fetchOnMount: false,
        options: {
            headers: { 'Content-Type': 'application/json', Authorization: getCookie('token') },
            method: 'PATCH',
            body: JSON.stringify({
                id: account.id,
                username_email,
                password
            })
        }
    });

    const handleSave = () => {
        goFetch();
    };

    return <>
        <Head> <title> Edit Your {account.account_name} account - iKeep </title> </Head>

        <Container width='min(600px, 100vw)' m='auto' px={2}>
            <Container py={2}> <BigHeader> Edit account </BigHeader> </Container>

            <Text as='h1' mb={2} align='right' color='#47848C'>
                {account.account_name.toUpperCase()}
            </Text>

            <FormFieldContainer>
                <label htmlFor="email_username"> EMAIL/USERNAME: </label>
                <Row width='auto' horizontalAlignment='center' m='0'>

                    <TextInput
                        value={username_email}
                        onInput={(e: TextInputEvent) => setUsername_email(e.target.value)}
                        placeholder='Email or Username'
                        id='email_username' />

                    <i onClick={handleSave}
                        className='bx bxs-save'
                        style={{ fontSize: '2.5rem', color: '#47848C' }}></i>
                </Row>
            </FormFieldContainer>

            <FormFieldContainer>
                <label htmlFor="password"> PASSWORD: </label>
                <Row style={{ width: 'auto' }} horizontalAlignment='center' m='0'>

                    <TextInput
                        value={password}
                        onInput={(e: TextInputEvent) => setPassword(e.target.value)}
                        placeholder='Password'
                        id='password' />

                    <i onClick={handleSave}
                        className='bx bxs-save'
                        style={{ fontSize: '2.5rem', color: '#47848C' }}></i>

                </Row>
            </FormFieldContainer>

            {loading && <Spinner isLoading={loading} size='1.5rem' />}
            {data && !error && <Text my={1} as='h3' color="green" align='right'> Update Saved! </Text>}
            {error && <Text my={1} align='right' color='red'> Update failed! </Text>}

            <ActionButtonsContainer>
                <Link href='/accounts' passHref>
                    <BlueButton> Done </BlueButton>
                </Link>
                <Link href='/accounts' passHref>
                    <DangerButton> cancel </DangerButton>
                </Link>
            </ActionButtonsContainer>

            <Footer />
        </Container>
    </>;
}


const ActionButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin: 2rem 0;
    @media screen and (max-width: 500px) {
        justify-content: center;
    }
`;

const FormFieldContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    align-items: center;
    margin: 1rem 0;
    &  input {
        width: 40ch;
    }
    @media screen and (max-width: 500px) {
        & > div {
            width: 100% !important;
        }
        & input {
            width: 100%;
        }
        & > label {
            margin-left: .3rem;
        }
        gap: .3rem;
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const reCookie = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};
    const { id }: any = context.params;

    if (reCookie) {
        const token = reCookie.token;
        if (!token) return { redirect: { destination: '/login', permanent: false } };
        const res = await fetch(process.env.BASE_URL + "/api/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
        });

        if (res.ok) {
            const user = await res.json();
            const account = user.accounts.find((a: any) => a.id === id);
            if (account) return {
                props: {
                    account: {
                        ...account,
                        username_email: decrypt(account.username_email, user.decrypting_pin),
                        password: decrypt(account.password, user.decrypting_pin),
                    }
                }
            };
            return { redirect: { destination: '/account/404', permanent: false } };
        }
    }

    return { props: {} };
};