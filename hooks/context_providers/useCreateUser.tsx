import useFetch from '@hooks/useFetch';
import { Children, User } from '@lib/types';
import React from 'react';

const CreateUserContext = React.createContext({});

export default function useCreateUser() {
    return React.useContext(CreateUserContext);
}

export function CreateUserProvider({ children }: Children) {

    const [user, setUser] = React.useState<User>({
        user_wallet_address: '',
        decrypting_pin: '',
        nickname: '',
        avatar: '',
    });

    const updateUserWalletAddress = (user_wallet_address: string) => setUser(prevUser => ({ ...prevUser, user_wallet_address: user_wallet_address }));
    const updatePin = (decrypting_pin: string) => setUser(prevUser => ({ ...prevUser, decrypting_pin: decrypting_pin }));
    const updateNickname = (nickname: string) => setUser(prevUser => ({ ...prevUser, nickname: nickname }));
    const updateAvatar = (avatar: string) => setUser(prevUser => ({ ...prevUser, avatar: avatar }));

    const create = (newUser: User) => {
        return useFetch('/api/user/create', {
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            },
            fetchOnMount: false
        });
    };

    return (
        <CreateUserContext.Provider value={{
            user, updateUserWalletAddress, updatePin, updateNickname, updateAvatar, create
        }}>
            {children}
        </CreateUserContext.Provider>
    );
}
