import { BlueButton } from '@styled/Button';
import Column from '@styled/Column';
import Text from '@styled/Text';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export default function AccountCreatedSuccess({ title, subtitle }: { title: string, subtitle: string; }) {
    return <>
        <ContainerBox>
            <i className='bx bxs-check-circle' style={{ color: '#8EB3FF', fontSize: '3rem' }}></i>
            <Column py={1} pb={2} verticalAlignment='center' gap={.3}>
                <Text as='h3' align='center'> {title} </Text>
                <Text align='cener'> {subtitle} </Text>
            </Column>
            <Link href='/accounts' passHref>
                <BlueButton> ok </BlueButton>
            </Link>
        </ContainerBox>
    </>;
}

const ContainerBox = styled.div`
    width: min(400px, 85vw);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 32px 12px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    flex-direction: column;
`;