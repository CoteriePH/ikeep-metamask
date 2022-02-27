import styled from "styled-components";

type LogoBackgroundType = {
    src?: string;
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
};

const LogoBackground = styled.img.attrs(props => ({
    src: props.src,
})) <LogoBackgroundType>`
    position: absolute;
    width: 45vmax;
    top: ${props => props.top};
    left: ${props => props.left};
    bottom: ${props => props.bottom};
    right: ${props => props.right};
    opacity: .2;
    z-index: -10;
`;

export default LogoBackground;