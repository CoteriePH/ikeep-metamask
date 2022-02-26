import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type ContainerType = SpacingProps & {
    width?: string;
};

const Container = styled.div<ContainerType>`
    ${Spacing};
    width: ${props => props.width || "100%"};
    margin: ${props => props.m || "auto"};
`;

export default Container;