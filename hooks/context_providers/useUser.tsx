import useFetch from '@hooks/useFetch';
import { Children } from '@lib/types';
import { getCookie } from '@util/cookie';
import React from 'react';

const UserContext = React.createContext<any>({});

export default function useUser() {
    return React.useContext(UserContext);
}

export const commonFetchConfig = (payload: Object, method: string) => ({
    options: {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('token')
        },
        body: JSON.stringify(payload)
    },
    fetchOnMount: false
});

export function UserProvider({ children }: any) {
    const [user, setUser] = React.useState(null);

    const getUser = () => {
        return useFetch('/api/user', {
            options: {
                method: 'POST',
                headers: { Authorization: getCookie('token'), 'Content-Type': 'application/json' },
            },
            fetchOnMount: false
        });
    };

    const changePin = (newPin: string) => {
        return useFetch('/api/user/changepin', commonFetchConfig({ newPin }, 'PATCH'));
    };

    const customize = (nickname: string, avatar: string) => {
        return useFetch('/api/user/customize', commonFetchConfig({ nickname, avatar }, 'PATCH'));
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            getUser,
            changePin,
            customize
        }}>
            {children}
        </UserContext.Provider>
    );
}