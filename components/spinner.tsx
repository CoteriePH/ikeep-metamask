import React from 'react';
import Text from 'styled/Text';

export default function Spinner({ width = 'auto', size = '1rem', isLoading = false, margin = '0rem' }) {
    if (!isLoading) return <></>;
    return (
        <Text width={width} align='center' fontSize={size} m={margin} as='span'>
            <i className='bx bx-loader loader'></i>
        </Text>
    );
}
