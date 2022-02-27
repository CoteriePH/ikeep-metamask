import Center from 'styled/Center';
import Text from 'styled/Text';
import TextInput from 'styled/TextInput';
import React, { useEffect, useState } from 'react';
import Avatar from '@components/Avatar';
import styled from 'styled-components';
import Column from 'styled/Column';
import { BlueButton, DangerButton, TealButton } from 'styled/Button';
import { TextInputEvent } from '@lib/types';
import useFetch from '@hooks/useFetch';
import { getCookie } from '@util/cookie';
import Link from 'next/link';

function Create() {
    const [avatar, setAvatar] = useState('/assets/user_placeholder.svg');
    const [nickname, setNickname] = useState('');
    const [decrypting_pin, setDecrypting_pin] = useState('');
    const [decrypting_pin_confirm, setdecrypting_pin_confirm] = useState('');

    const [valid, setValid] = useState(false);
    const [currentView, setCurrentView] = useState(0);

    const { data, error, loading, goFetch, success } = useFetch('/api/user/create', {
        options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, decrypting_pin, avatar, wallet_address: getCookie('userWalletAddress') })
        },
        fetchOnMount: false
    });

    const handleSave = async () => {
        await goFetch();
    };

    useEffect(() => {
        setValid(
            nickname.length > 2 &&
            decrypting_pin.length >= 9 &&
            decrypting_pin === decrypting_pin_confirm
        );
    }, [nickname, decrypting_pin, decrypting_pin_confirm]);

    return (
        <Center direction='column' p={2} gap={1.5} width='400px'>

            {currentView === 0 && <>
                <Text as='h2' my={2}> Create your account </Text>

                <Column aria-label='sign up form' role='form'>
                    <Text mb={.3} ml={.5} fontSize='.8rem'> Give it a name </Text>
                    <TextInput
                        fullWidth placeholder="Your name"
                        name='nickname'
                        value={nickname}
                        onInput={(e: TextInputEvent) => setNickname(e.target.value)} />
                </Column>
                <Column>
                    <Text mb={.3} ml={.5} fontSize='.8rem'> Create a pin (minimum of 9 characters) </Text>
                    <TextInput
                        fullWidth placeholder="Your pin"
                        name='decrypting_pin'
                        value={decrypting_pin}
                        onInput={(e: TextInputEvent) => setDecrypting_pin(e.target.value)} />
                </Column>
                <Column>
                    <Text mb={.3} ml={.5} fontSize='.8rem'> Confirm your pin </Text>
                    <TextInput
                        fullWidth placeholder="Your pin"
                        name='decrypting_pin_confirm'
                        value={decrypting_pin_confirm}
                        onInput={(e: TextInputEvent) => setdecrypting_pin_confirm(e.target.value)} />
                </Column>

                <Center direction='column' pt={1}>
                    <BlueButton disabled={!valid} onClick={() => setCurrentView(1)}> next </BlueButton>

                    <Link href='/login' passHref>
                        <Text color='#0D84A6' fontSize={.8} mt={2} style={{ cursor: 'pointer' }}>
                            Already have an account? Login instead
                        </Text>
                    </Link>
                </Center>

            </>}

            {currentView === 1 && <>
                <Avatar
                    src={avatar} size='5rem'
                    className={loading && 'loading-avatar'} />

                <Text as='h3' mb={1} color={data ? 'green' : error ? 'red' : 'inherit'}>
                    {
                        loading ? 'Creating your account...'
                            : data ? 'Yey! Account created ✔️'
                                : error ? error.message || 'Something went wrong' : 'Choose your Avatar'
                    }
                </Text>

                {!data && !success ? <>
                    <AvatarOptions>
                        {avatarSources.map((source, index) =>
                            <Center direction='column' onClick={() => setAvatar(source)} key={index}>
                                <Avatar size='4.5rem' src={source} />
                            </Center>)}
                    </AvatarOptions>

                    <Center direction='row' pt={1} gap={1}>
                        <DangerButton disabled={loading} onClick={() => setCurrentView(0)}> back </DangerButton>
                        <BlueButton disabled={!valid || loading} onClick={handleSave}> save </BlueButton>
                    </Center>

                    <Link href='/login' passHref>
                        <Text color='#0D84A6' fontSize={.8} style={{ cursor: 'pointer' }}>
                            Already have an account? Login instead
                        </Text>
                    </Link>
                </>
                    :
                    <Center direction='row'>
                        <Link href='/login' passHref>
                            <TealButton disabled={!success}> Login as {nickname}</TealButton>
                        </Link>
                    </Center>
                }
            </>}

        </Center>
    );
}

export default Create;


const AvatarOptions = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

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