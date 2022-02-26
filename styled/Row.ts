import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type RowType = SpacingProps & {
    verticalAlignment?:
    "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    horizontalAlignment?:
    "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    width?: string;
    height?: string;
    position?: "relative" | "absolute" | "fixed";
    gap?: string | number;
};

const Row = styled.div<RowType>`
    ${Spacing};

    position: ${props => props.position || "relative"};
    width: ${props => props.width || '100%'};
    height: ${props => props.height || "auto"};
    margin: ${props => props.m || 'auto'};
    
    display: flex;
    align-items: ${props => props.horizontalAlignment || 'flex-start'};
    justify-content: ${props => props.verticalAlignment || 'flex-start'};
    gap: ${props => {
        if (!props.gap) return 0;
        if (typeof props.gap === 'string') return props.gap;
        return props.gap + 'rem';
    }};
`;

export default Row;