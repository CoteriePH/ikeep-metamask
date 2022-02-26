import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type TextProps = SpacingProps & {
    align?: string;
    fontSize?: string | number;
    color?: string;
    fontStyle?: string;
    width?: string;
    transform?: string;
};

const Text = styled.p<TextProps>`
    ${Spacing};
    
    text-align: ${props => props.align || 'left'};
    color: ${props => props.color || 'inherit'};
    width: ${props => props.width || 'auto'};
    text-transform: ${props => props.transform || 'none'};

    font-size: ${props => {
        if (!props.fontSize) return 'normal';
        if (typeof props.fontSize === 'string') return props.fontSize;
        return props.fontSize + 'rem';
    }};
`;

export default Text;