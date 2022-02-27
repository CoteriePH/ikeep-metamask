import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Column from '@styled/Column';
import Text from '@styled/Text';
import Avatar from '@components/Avatar';
import TextInput from '@styled/TextInput';
import { TextInputEvent } from '@lib/types';
import Row from '@styled/Row';
import { BlueButton, DangerButton } from '@styled/Button';
import Center from '@styled/Center';
import AccountCreatedSuccess from '@components/AccountCreatedSuccess';
import { getCookie } from '@util/cookie';
import useFetch from '@hooks/useFetch';

const avatarSources = [
    '/assets/placeholder_avatars/female_pink_hair.svg',
    '/assets/placeholder_avatars/female_green_hair.svg',
    '/assets/placeholder_avatars/male_orange_hair.svg',
    '/assets/placeholder_avatars/nerd_male.svg',
    '/assets/placeholder_avatars/female_purple_hair.svg',
    '/assets/placeholder_avatars/male_rockstar.svg',
    '/assets/placeholder_avatars/male_brown_hair.svg',
    '/assets/placeholder_avatars/female_brown_hair.svg',
    '/assets/placeholder_avatars/nerd_female.svg',
];

export default function Customize() {

    const router = useRouter();

    const [avatarSource, setAvatarSource] = useState('/assets/user_placeholder.svg');
    const [nickname, setNickname] = useState("");
    const [dialogueIsShown, setDialogueIsShown] = useState(false);

    const { loading, error, goFetch, success } = useFetch('/api/user/customize', {
        fetchOnMount: false,
        options: {
            headers: { 'Content-type': 'application/json', Authorization: getCookie('token') },
            method: 'PATCH',
            body: JSON.stringify({
                nickname: nickname,
                avatar: avatarSource
            })
        }
    });

    const goBack = () => router.replace('/accounts');

    const handleSave = () => {
        goFetch();
    };

    useEffect(() => {
        if (success) {
            setDialogueIsShown(true);
        }
    }, [success]);

    return <>
        <Head> <title> Customize Account - iKeep </title> </Head>

        <Column verticalAlignment='center' py={3} m='auto' width='min(600px, 85vw)'>

            <Text align='center' as='h3'> Customize your Account </Text>

            <AvatarSelectorContainer>

                <Column verticalAlignment='center' p={1}>
                    <Avatar size='10rem' src={avatarSource} className={loading ? 'loading-avatar' : ''} />

                    <TextInput
                        placeholder='Enter nickname' my={1} fullWidth
                        value={nickname}
                        onInput={(e: TextInputEvent) => setNickname(e.target.value)} />

                    <Row verticalAlignment='center' gap='1rem'>
                        <DangerButton onClick={goBack}> back </DangerButton>

                        <BlueButton disabled={nickname.length < 2 || avatarSource == '/assets/user_placeholder.svg'} onClick={handleSave}> save </BlueButton>
                    </Row>
                </Column>

                <AvatarOptions>
                    {avatarSources.map((source, index) =>
                        <Center direction='column' onClick={() => setAvatarSource(source)} key={index}>
                            <Avatar size='5rem' src={source} />
                        </Center>)}
                </AvatarOptions>

            </AvatarSelectorContainer>

            {error && <Text style={{ color: 'red' }}> Something went wrong </Text>}
        </Column>

        {dialogueIsShown && <AccountCreatedSuccess subtitle={'You will be redirected to login page'} title='Account Created Successfully' />}
    </>;
}

const AvatarSelectorContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    margin: 2rem 0;
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const AvatarOptions = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-content: flex-start;
    padding-left: 2rem;
    @media screen and (max-width: 600px) {
        padding-left: 0;
        margin: 2rem auto;
    }
`;


// ============================================================================

import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {

    const reqCookie = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};

    if (reqCookie) {
        const address = reqCookie.userWalletAddress;
        const token = reqCookie.token;
        if (address && token) return { props: {} };
        if (address && !token) return { redirect: { destination: '/login', permanent: false } };
    }

    return { redirect: { destination: '/index.html', permanent: false } };
};
