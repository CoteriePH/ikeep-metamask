import useFetch from '@hooks/useFetch';
import { TextInputEvent } from '@lib/types';
import { BlueButton } from 'styled/Button';
import Center from 'styled/Center';
import Column from 'styled/Column';
import Text from 'styled/Text';
import TextInput from 'styled/TextInput';
import { getCookie, setCookie } from '@util/cookie';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '@components/spinner';

const Login: NextPage = () => {

    const router = useRouter();
    const [pin, setPin] = useState('');
    const { data, loading, error, goFetch } = useFetch('/api/user/login', {
        fetchOnMount: false,
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wallet_address: getCookie('userWalletAddress'),
                decrypting_pin: pin
            })
        }
    });

    useEffect(() => {
        if (data && !error) {
            setCookie('token', data.accessToken, 1);
            router.replace('/accounts');
        }
    }, [data]);

    const handleLogin = async () => {
        await goFetch();
    };

    return <>
        <Head> <title> Login - iKeep </title> </Head>

        <Center
            width='500px'
            direction='column'
            gap={1.5} p={2} m='2rem auto'>

            <Image src='/logo.svg' width={150} height={150} alt='iKeep logo' />

            <Column>
                <Text mb={.3} fontSize='.8rem'> &nbsp;&nbsp; DECRYPTING PIN </Text>
                <TextInput
                    value={pin}
                    fullWidth
                    onInput={(e: TextInputEvent) => setPin(e.target.value)}
                    placeholder='Enter your decrypting pin' />

                {error && <Text
                    width='100%'
                    fontSize={.8}
                    align='center'
                    color='red' mt={1}>
                    {error.message || 'Login failed'}
                </Text>}

                <Spinner isLoading={loading} width='100%' size='1.5rem' margin='1rem 0 0 0' />
            </Column>

            <BlueButton onClick={handleLogin} disabled={pin.length < 9 || loading}> login </BlueButton>

            <Link href='/create' passHref>
                <Text color='#0D84A6' style={{ cursor: 'pointer' }} mt={1} fontSize={.9}>
                    Don&apos;t have an account? Create one
                </Text>
            </Link>

        </Center>
    </>;
};
export default Login;