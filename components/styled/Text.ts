import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type TextProps = SpacingProps & {
    align?: string;
    fontSize?: string | number;
    color?: string;
    fontStyle?: string;
};

const Text = styled.p<TextProps>`
    ${Spacing};
    
    text-align: ${props => props.align || 'left'};
    color: ${props => props.color || 'inherit'};

    font-size: ${props => {
        if (!props.fontSize) return 'normal';
        if (typeof props.fontSize === 'string') return props.fontSize;
        return props.fontSize + 'rem';
    }};
`;

export default Text;