import React from "react";
import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type TextInputProps = SpacingProps & {
    type?: "text" | "password",
    value?: string,
    name?: string,
    fullWidth?: boolean,
    placeholder: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
};

const TextInput = styled.input.attrs(props => ({
    type: props.type || "text",
})) <TextInputProps>`
    ${Spacing};
    
    outline: none;
    background: #EBEFFE;
    border-radius: 15px;
    color: #8168FF;
    border: none;
    outline: none;
    padding: 1rem;
    transition: 200ms;
    border: 2px solid #EBEFFE;
    min-width: 20ch;
    width: ${props => props.width || 'auto'};
    width: ${props => props.fullWidth ? '100%' : 'auto'};

    &::placeholder {
        color: #8168FF;
        font-weight: 600;
    }
    &:hover, &:focus {
        background: #FBFCFF;
        border: 2px solid #7B61FF;
        box-sizing: border-box;
        border-radius: 15px;
    }
    &:focus::placeholder {
        color: hsla(250, 100%, 70%, .5);
    }
    &:disabled::placeholder {
        color: #352D70;
    }
    &:disabled {
        --bg-color: #d3dae6;
        pointer-events: none;
        color: #443c7a;
        background: var(--bg-color);
        border: 2px solid var(--bg-color);
    }
`;

export default TextInput;