import React from 'react';
import styled from 'styled-components';

type AccountStoreProps = {
    numberOfAccounts: number;
};

export default function AccountStore({ numberOfAccounts }: AccountStoreProps) {
    return (
        <AccountStoreContainer>
            <span style={{ color: '#47848C', fontWeight: '900' }}> {numberOfAccounts} </span>
            <span style={{ color: '#a8a8a8' }}> {numberOfAccounts > 1 ? 'accounts' : 'account'} stored </span>
        </AccountStoreContainer>
    );
}

const AccountStoreContainer = styled.div`
    padding: 0.7rem;
    border-left: 5px solid #47848C;
    border-radius: .8rem;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.06);
    flex: 1;
`;
