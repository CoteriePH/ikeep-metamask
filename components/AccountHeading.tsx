import { deleteCookie } from '@util/cookie';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { DangerButton } from 'styled/Button';
import Column from 'styled/Column';
import Hello from 'styled/hello';
import Row from 'styled/Row';
import Text from 'styled/Text';
import Avatar from './Avatar';

type AccountHeadingProps = {
    avatar: string;
    nickname: string;
};

export default function AccountHeading({ nickname, avatar }: AccountHeadingProps) {

    const router = useRouter();

    const logout = () => {
        if (!window.confirm('Are sure you want to logout?')) return;
        deleteCookie('token');
        deleteCookie('userWalletAddress');
        router.replace('/');
    };

    return (
        <AccountHeadingContainer>
            <div> <Avatar src={avatar} size='5.5rem' /> </div>
            <Column className='center-in-600'>
                <Hello> Hello, </Hello>
                <Row horizontalAlignment='center' gap={.2} pt={.3} className='center-in-600'>
                    <Text as='h1' color='#788CB3'> {nickname} </Text>
                    <Text as='h2' style={{ transform: 'translateY(4px)' }} color='#788CB3'> <i className='bx bxs-edit-alt'></i> </Text>
                </Row>
            </Column>
            <div className="flex" />
            <DangerButton onClick={logout}> log out </DangerButton>
        </AccountHeadingContainer>
    );
}

const AccountHeadingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    @media screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        & .center-in-600 {
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        & .flex {
            display: none;
        }
    }
`;
