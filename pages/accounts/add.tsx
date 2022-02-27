import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import useForm from '@hooks/useForm';
import { useRouter } from 'next/router';
import Container from 'styled/Container';
import TextInput from 'styled/TextInput';
import Text from 'styled/Text';
import { BlueButton, DangerButton } from 'styled/Button';
import Footer from '@components/Footer';
import LogoBackground from 'styled/LogoBackground';
import useFetch from '@hooks/useFetch';
import { getCookie } from '@util/cookie';
import Spinner from '@components/spinner';
import Row from 'styled/Row';

export default function Add() {

    const { values, onInputHandler } = useForm(() => ({
        account_name: '',
        username_email: '',
        password: '',
    }));
    const [valid, setValid] = React.useState(false);
    const router = useRouter();

    const { data, loading, error, goFetch } = useFetch('/api/account/add', {
        fetchOnMount: false,
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: getCookie('token') },
            body: JSON.stringify(values)
        }
    });

    useEffect(() => {
        setValid(values.account_name.length > 2 && values.username_email.length > 2 && values.password.length > 2);
    }, [values]);

    useEffect(() => {
        if (data && !error) {
            router.replace('/accounts');
        }
    });


    const handleStore = () => {
        if (!valid) return;
        goFetch();
    };

    return <>
        <Head> <title> Add Account - iKeep </title> </Head>

        <Container width='min(700px, 100vw)' m='auto' style={{ overflow: 'hidden' }} p={2}>
            <Row py={2} horizontalAlignment='center'>
                <BigHeader> add account <Spinner isLoading={loading} size='1.5rem' /> </BigHeader>
            </Row>

            <FormField>
                <label htmlFor="account-name"> ACCOUNT NAME: </label>
                <TextInput
                    fullWidth placeholder='Enter account name'
                    name='account_name'
                    value={values.account_name}
                    onInput={onInputHandler} />
            </FormField>
            <FormField>
                <label htmlFor="account-name"> ACCOUNT EMAIL/USERNAME: </label>
                <TextInput
                    fullWidth placeholder='Enter account email or username'
                    name='username_email'
                    value={values.username_email}
                    onInput={onInputHandler} />
            </FormField>
            <FormField>
                <label htmlFor="account-name"> ACCOUNT PASSWORD: </label>
                <TextInput
                    fullWidth placeholder='Enter account password'
                    name='password'
                    value={values.password}
                    onInput={onInputHandler} />
            </FormField>

            {error && <Text align='center' color='red' mt={2}> {error.message || 'Something went wrong'} </Text>}

            <NoteLowerPortion>
                <div className="note">
                    <i className='bx bxs-edit' style={{ fontSize: '4rem', color: 'rgba(53, 45, 112, 0.5)' }}></i>
                    <div>
                        <h4>note.</h4>
                        <Text fontSize='.7rem'> <b> Your decrypting pin is necessary </b> for you to view the account log in details you stored using the system. You can edit the login details you added in case you changed them in another platform. </Text>
                    </div>
                </div>

                <Actions>
                    <BlueButton onClick={handleStore} disabled={!valid || loading}> store </BlueButton>
                    <Link href='/accounts' passHref>
                        <DangerButton disabled={loading}> cancel </DangerButton>
                    </Link>
                </Actions>
            </NoteLowerPortion>

            <Footer />

            <LogoBackground
                style={{ transform: 'scale(1)', opacity: .1 }} src='/logo.svg' top={'10%'} right={'-30%'} />

        </Container>
    </>;
}

export const BigHeader = styled.h1`
    font-family: Archivo;
    font-style: normal;
    font-weight: 800;
    font-size: 3.5rem;
    color: rgba(71, 132, 140, 0.5);
`;

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media screen and (max-width: 500px) {
        flex-direction: row;
        margin: 1.5rem 0;
    }
`;

const NoteLowerPortion = styled.div`
    display: flex;
    align-items: center;
    margin: 2rem 0;
    & > .note {
        flex: 1;
        display: flex;
        align-items: center;
        gap: .5rem;
    }
    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
`;

const FormField = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    & > label {
        text-align: right;
    }
    @media screen and (max-width: 500px) {
        gap: .3rem;
        grid-template-columns: 1fr;
        & > label {
            text-align: left;
            margin-left: .5rem;
        }
    }
`;