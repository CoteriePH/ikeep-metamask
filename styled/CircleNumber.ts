import styled from "styled-components";
import { Spacing } from "./globalStyle";

const CircleNumber = styled.div`
    ${Spacing};
    --size: 50px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: #8EB3FF;
    color: white;
    font-weight: 600;
    display: inline-grid;
    place-items: center;
    flex: 0 0;
`;

export default CircleNumber;