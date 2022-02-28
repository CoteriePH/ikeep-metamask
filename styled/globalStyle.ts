import { createGlobalStyle, css, ThemeProps } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Archivo', sans-serif;
        color: #352D70;
    }
    body {
        position: relative;
        scroll-behavior: smooth;
    }
    #__next {
        position: relative;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    .avatar:hover {
        box-shadow: 0 0 0 2px #8168FF;
    }
    .loading-avatar {
        animation: loadingAvatar 1.5s infinite ease;
        transition: 200ms;
    }
    .success-avatar {
        box-shadow: 0 0 0 4px yellowgreen;
    }
    .flex {
        flex: 1;
    }
    .loader {
        animation: spin 1s infinite linear;
    }
    .clickable {
        cursor: pointer;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes loadingAvatar {
        0% { box-shadow: 0 0 0 2px #8168FF; }
        25% { box-shadow: 0 0 0 4px hotpink; }
        50% { box-shadow: 0 0 0 8px #8168FF; }
        75% { box-shadow: 0 0 0 4px #0ed1b1; }
        100% { box-shadow: 0 0 0 2px #8168FF; }
    }
`;

export default GlobalStyle;

// ========================================================

export type PaddingProps = ThemeProps<any> & {
    p?: string | number,
    px?: string | number,
    py?: string | number,
    pt?: string | number,
    pb?: string | number,
    pl?: string | number,
    pr?: string | number,
};
export type MarginProps = ThemeProps<any> & {
    m?: string | number,
    mx?: string | number,
    my?: string | number,
    mt?: string | number,
    mb?: string | number,
    ml?: string | number,
    mr?: string | number,
};

export type SpacingProps = ThemeProps<any> & PaddingProps & MarginProps;

export const Spacing = css`
    padding: ${(props: PaddingProps) => {
        if (typeof props.p === 'string') return props.p;
        if (props.p) return `${props.p}rem`;
        if (props.px && props.py) return `${props.py}rem ${props.px}rem`;
        if (props.px && !props.py) return `0 ${props.px}rem`;
        if (!props.px && props.py) return `${props.py}rem 0`;
    }};
    /* over rides old value */
    padding-top: ${(props: PaddingProps) => props.pt + "rem" || 0};
    padding-bottom: ${(props: PaddingProps) => props.pb + "rem" || 0};
    padding-left: ${(props: PaddingProps) => props.pl + "rem" || 0};
    padding-right: ${(props: PaddingProps) => props.pr + "rem" || 0};

    margin: ${(props: MarginProps) => {
        if (typeof props.m == 'string') return props.m;
        if (props.m) return `${props.m}rem`;
        if (props.mx && props.my) return `${props.my}rem ${props.mx}rem`;
        if (props.mx && !props.my) return `0 ${props.mx}rem`;
        if (!props.mx && props.my) return `${props.my}rem 0`;
    }};
    /* over rides old value */
    margin-top: ${(props: MarginProps) => props.mt + "rem" || 0};
    margin-bottom: ${(props: MarginProps) => props.mb + "rem" || 0};
    margin-left: ${(props: MarginProps) => props.ml + "rem" || 0};
    margin-right: ${(props: MarginProps) => props.mr + "rem" || 0};
`;