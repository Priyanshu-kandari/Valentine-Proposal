import React from 'react';
import teddyImg from '../assets/teddy.png';

const DancingTeddy = ({ position, delay = 0, size = 'md' }) => {
    // Determine position styles
    const positionStyles = {
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'left-center': 'top-1/2 left-10 transform -translate-y-1/2',
        'right-center': 'top-1/2 right-10 transform -translate-y-1/2',
        'right-center-fixed': 'fixed top-1/2 right-4 md:right-10 transform -translate-y-1/2',
    };

    const sizeStyles = {
        'sm': 'w-16 h-16',
        'md': 'w-24 h-24 md:w-32 md:h-32',
        'lg': 'w-32 h-32 md:w-48 md:h-48',
        'xl': 'w-48 h-48 md:w-64 md:h-64',
    };

    const animationStyle = {
        animationDelay: `${delay}s`,
    };

    return (
        <div
            className={`absolute ${position ? positionStyles[position] : ''} z-10 ${sizeStyles[size]} pointer-events-none`}
            style={animationStyle}
        >
            <img
                src={teddyImg}
                alt="Dancing Teddy"
                className="w-full h-full object-contain animate-bounce-custom"
            />
        </div>
    );
};

export default DancingTeddy;
