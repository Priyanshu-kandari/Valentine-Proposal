import React from 'react';

const PixelCard = ({ children, className = '', noPadding = false }) => {
    return (
        <div className={`bg-white border-4 border-black shadow-pixel p-6 ${noPadding ? 'p-0' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default PixelCard;
