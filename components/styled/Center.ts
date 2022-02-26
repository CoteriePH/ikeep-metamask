import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type CenterType = SpacingProps & {
    direction?: "column" | "row";
    width?: string;
    height?: string;
    position?: "relative" | "absolute" | "fixed";
    gap?: string | number;
};

const Column = styled.div<CenterType>`
    ${Spacing};

    position: ${props => props.position || "relative"};
    width: ${props => props.width || '100%'};
    height: ${props => props.height || "auto"};
    margin: ${props => props.m || 'auto'};
    
    display: flex;
    flex-direction: ${props => {
        if (!props.direction) throw new Error("direction is required");
        return props.direction;
    }};
    justify-content: center;
    align-items: center;
    gap: ${props => {
        if (!props.gap) return 0;
        if (typeof props.gap === 'string') return props.gap;
        return props.gap + 'rem';
    }};
`;

export default Column;