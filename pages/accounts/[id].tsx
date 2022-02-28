import Link from 'next/link';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from 'styled/Container';
import { BigHeader } from './add';
import Text from 'styled/Text';
import Row from 'styled/Row';
import TextInput from 'styled/TextInput';
import { TextInputEvent } from '@lib/types';
import { BlueButton, DangerButton } from 'styled/Button';
import Footer from '@components/Footer';
import useFetch from '@hooks/useFetch';
import Spinner from '@components/spinner';
import { getCookie } from '@util/cookie';
import useUser from '@hooks/context_providers/useUser';
import Center from '@styled/Center';

export default memo(Edit);

function Edit() {
    const { user, getUser, setUser } = useUser();
    const { data, error, goFetch, success } = getUser();
    const [account, setAccount] = useState<any>(null);
    const router = useRouter();

    const [username_email, setUsername_email] = useState('');
    const [password, setPassword] = useState('');
    const [decyrptionPin, setDecyrptionPin] = useState('');
    const [invalidPin, setInvalidPin] = useState(true);


    useEffect(() => {
        if (!user) goFetch();
        else {
            const { id } = router.query;
            const accountExist = user.accounts.find((account: any) => account.id == id);
            if (accountExist) {
                setAccount(accountExist);
                setUsername_email(accountExist.username_email);
                setPassword(accountExist.password);
            }
            else router.replace('/accounts');
        }
    }, [user]);

    useEffect(() => {
        if (success) setUser(data);
        if (error) router.replace('/index.html');
    }, [success, data, error]);

    const [state, setState] = useState('encrypted');

    const decrypttion = useFetch('/api/account/decrypt', {
        options: {
            headers: { 'Content-Type': 'application/json', Authorization: getCookie('token') },
            body: JSON.stringify({ account_id: account?.id, pin: decyrptionPin }),
            method: 'POST'
        },
        fetchOnMount: false
    });

    const deletion = useFetch('/api/account/delete', {
        fetchOnMount: false,
        options: {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: getCookie('token') },
            body: JSON.stringify({ account_id: account?.id })
        }
    });

    const deleteAccount = () => {
        if (!window.confirm(`Are you sure you want to delete your ${account.account_name} account?`)) return;
        deletion.goFetch();
    };

    const changeState = () => {
        if (state === 'encrypted') {
            setState('decrypt');
            setInvalidPin(true);
        }
        else if (state === 'decrypt') {
            if (decyrptionPin.trim() === '') return;
            decrypttion.goFetch();
        }
        else if (state === 'decrypted') {
            setState('encrypted');
            setUsername_email(account.username_email);
            setPassword(account.password);
            setDecyrptionPin('');
        }
    };

    useEffect(() => {
        if (decrypttion.data && !decrypttion.error) {
            setUsername_email(decrypttion.data.username_email);
            setPassword(decrypttion.data.password);
            setState('decrypted');
        }
    }, [decrypttion.data]);

    useEffect(() => {
        if (deletion.success) router.replace('/accounts');
    }, [deletion.success]);

    useEffect(() => {
        setInvalidPin(state == 'decrypt' && decyrptionPin.trim().length < 9);
    }, [decyrptionPin]);

    return !account ?
        <>
            <Center direction='column' gap={.5} p={2}>
                <Spinner isLoading={true} />
                <Text as='h1' align='center'> iKeep </Text>
            </Center>
        </>
        : <>
            <Head> <title> Your {account.account_name} account - iKeep </title> </Head>

            <Container width='min(600px, 100vw)' m='auto' px={2}>
                <Container py={2}> <BigHeader> view account </BigHeader> </Container>

                <Text as='h1' mb={2} style={{ textAlign: 'right', color: '#47848C' }}>
                    {account.account_name.toUpperCase()}
                    <Text onClick={deleteAccount} ml={.3} fontSize={1.2} as='span'> <i className='bx bx-trash'></i> </Text>
                </Text>

                <FormFieldContainer>
                    <Text htmlFor="email_username" as='label' align='right'> EMAIL/USERNAME: </Text>
                    <Row m='0' verticalAlignment='flex-end' width='auto'>
                        <TextInput
                            disabled={state === 'decrypted'}
                            placeholder='Email or Username'
                            id='email_username'
                            value={username_email}
                            onInput={(e: TextInputEvent) => setUsername_email(e.target.value)}
                        />

                        {state === 'decrypted' &&
                            <Link href={'/accounts/edit/' + account.id} passHref>
                                <i className='bx bxs-message-square-edit' style={{ fontSize: '3rem' }}></i>
                            </Link>
                        }
                    </Row>
                </FormFieldContainer>

                <FormFieldContainer>
                    <label htmlFor="password"> PASSWORD: </label>
                    <Row m='0' verticalAlignment='flex-end' width='auto'>
                        <TextInput
                            disabled={state === 'decrypted'}
                            placeholder='Password'
                            id='password'
                            value={password}
                            onInput={(e: TextInputEvent) => setPassword(e.target.value)}
                        />

                        {state === 'decrypted' &&
                            <Link href={'/accounts/edit/' + account.id} passHref>
                                <i className='bx bxs-message-square-edit' style={{ fontSize: '3rem' }}></i>
                            </Link>
                        }
                    </Row>
                </FormFieldContainer>

                {state === 'decrypt' && <FormFieldContainer>
                    <label htmlFor="decryptingPin"> ENTER DECRYPTION PIN: </label>
                    <TextInput
                        placeholder='DECRYPTION PIN' id='decryptingPin'
                        value={decyrptionPin}
                        onInput={(e: TextInputEvent) => setDecyrptionPin(e.target.value)}
                    />
                </FormFieldContainer>}

                {decrypttion.loading && <Text color='red' align='center' my={1}> <Spinner size='1.5rem' isLoading={decrypttion.loading} /> </Text>}
                {(decrypttion.error || deletion.error) && <Text color='red' align='center' my={1}>
                    {decrypttion.error.message || deletion.error.message || 'Something went wrong'}
                </Text>}

                <ActionButtonsContainer>
                    <BlueButton onClick={changeState} disabled={invalidPin || decrypttion.loading}>
                        {state === 'encrypted' ? 'decrypt' : (state === 'decrypted' ? 'Encrypt' : 'submit')}
                    </BlueButton>
                    <Link href='/accounts' passHref>
                        <DangerButton> back </DangerButton>
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
    & input {
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