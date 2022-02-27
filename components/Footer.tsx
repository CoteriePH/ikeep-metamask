import React from 'react';
import styled from 'styled-components';
import Row from 'styled/Row';
import Text from 'styled/Text';

export default function Footer() {
    return (
        <Row horizontalAlignment='flex-end' gap='1rem'>
            <IKeep> iKeep </IKeep>
            <Text fontSize='.7rem'> Copyright 2022 <br /> All Rights Reserved </Text>
            <div style={{
                flex: 1,
                borderBottom: '1.5px solid #788CB3',
            }}></div>
        </Row>
    );
}

const IKeep = styled.div`
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: -0.06em;
    color: rgba(53, 45, 112, 0.5);
`;