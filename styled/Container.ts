import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type ContainerType = SpacingProps & {
    width?: string;
    height?: string;
    position?: "relative" | "absolute" | "fixed";
};

const Container = styled.div<ContainerType>`
    ${Spacing};
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "auto"};
    margin: ${props => props.m || "auto"};
    position: ${props => props.position || "relative"};
`;

export default Container;