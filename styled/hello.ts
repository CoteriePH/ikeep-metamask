import styled from "styled-components";
import { Spacing, SpacingProps } from "./globalStyle";

type HelloType = SpacingProps & {
    display?: string;
};

const Hello = styled.span<HelloType>`
    ${Spacing};
    display: ${props => props.display || "inline"};
    background-color: #788CB3;
    color: white;
    border-radius: 4px;
    font-weight: 600;
    font-size: .8rem;
    padding: .3rem 1rem;
`;

export default Hello;