import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type ButtonType = SpacingProps & {
    lowercase?: string;
    fullWidth?: boolean;
};

const Button = styled.button<ButtonType>`
    ${Spacing};
    border: none;
    outline: none;
    text-transform: ${props => props.lowercase ? "none" : "uppercase"};
    border-radius: 9px;
    cursor: pointer;
    transition: 200ms;
    color: white;
    height: 50px;
    min-width: 128px;
    width: ${props => props.fullWidth ? "100%" : "auto"};
    padding: .5rem 1rem;
    font-weight: 600;
`;

export const BlueButton = styled(Button)`
    background: #250FCC;
    &:hover {
        background: #352D70;
    }
    &:disabled {
        pointer-events: none;
        background: #352D70;
        opacity: .5;
    }
`;

export const DangerButton = styled(Button)`
    background: rgba(233, 169, 169, 0.2);
    color: #A12E2E;
    &:hover {
        background: #A12E2E;
        color: white;
    }
    &:disabled {
        background: rgba(161, 46, 46, 0.2);
        opacity: .6;
        color: #A12E2E;
}
`;

export const TealButton = styled(Button)`
    background: rgba(13, 132, 166, 0.05);
    box-sizing: border-box;
    border: 1px solid #0D84A6;
    color: #0D84A6;
    &:hover {
        background: rgba(13, 132, 166, 0.9);
        color: white;
    }
    &:disabled {
        border: 1px solid #0D84A6;
        color: #0D84A6;
        background: rgba(13, 132, 166, 0.05);
        opacity: .6;
    }
`;

export const TealDarkButton = styled(Button)`
    background: rgba(71, 132, 140, 0.05);
    border: 1px solid #47848C;
    box-sizing: border-box;
    border-radius: 15px;
    color: #47848C;
    &:hover {
        background: rgba(71, 132, 140, 0.9);
        color: white;
    }
    &:disabled {
        background: rgba(71, 132, 140, 0.05);
        color: #47848C;
        opacity: .6;
    }
`;