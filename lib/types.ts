import { ReactChildren } from "react";

export type Children = { children: ReactChildren; };

export type User = {
    user_wallet_address: string,
    decrypting_pin: string,
    nickname: string,
    avatar: string,
};

export type TextInputEvent = React.ChangeEvent<HTMLInputElement>;