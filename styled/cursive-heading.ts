import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type CursiveHeadingType = SpacingProps & {
    size?: string;
    align?: string;
};

const CursiveHeading = styled.h2<CursiveHeadingType>`
    ${Spacing};
    color: #352D70;
    font-family: Pacifico;
    letter-spacing: 0.05em;
    font-size: ${props => props.size || "1.5rem"};
    text-align: ${props => props.align || "left"};
`;

export default CursiveHeading;