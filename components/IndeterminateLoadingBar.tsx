import useLoading from '@hooks/context_providers/useLoading';
import React from 'react';
import styled from 'styled-components';

export default function IndeterminateLoadingBar() {
    const { loading } = useLoading();

    return loading ? (
        <IndeterminateLoadingBarContainer>
            <div className="line" />
            <div className="subline inc" />
            <div className="subline dec" />
        </IndeterminateLoadingBarContainer>
    ) : <></>;
}

const IndeterminateLoadingBarContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 5px;
    overflow-x: hidden;
    z-index: 100;

    & .line{
        position:absolute;
        top: 0;
        opacity: 0.4;
        background:#4a8df8;
        width:150%;
        height:5px;
    }

    & .subline{
        position:absolute;
        background:#4a8df8;
        height:5px; 
    }
    & .inc{
        animation: increase 2s infinite;
    }
    & .dec{
        animation: decrease 2s 0.5s infinite;
    }

    @keyframes increase {
        from { left: -5%; width: 5%; }
        to { left: 130%; width: 100%;}
    }
    @keyframes decrease {
        from { left: -80%; width: 80%; }
        to { left: 110%; width: 10%;}
    }
`;
