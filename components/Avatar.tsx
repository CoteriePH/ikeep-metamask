import Image from 'next/image';
import React from 'react';

export default function Avatar({ src, size, className }: any) {
    src = src || '/assets/user_placeholder.svg';
    size = size || '56px';
    return (
        <div style={{
            width: size,
            height: size,
            ...styles
        }} className={'avatar ' + className}>
            <Image layout='fill' src={src} priority alt='avatar' />
        </div>
    );
}

const styles: any = {
    borderRadius: '50%',
    transition: '200ms',
    overflow: 'hidden',
    display: 'inline-block',
    position: 'relative',
};