import React from 'react';

const PixelButton = ({ children, onClick, className = '', type = 'button', variant = 'primary' }) => {
    const baseStyles = "font-press-start text-xs sm:text-sm px-6 py-4 border-4 border-black shadow-pixel transition-transform active:translate-x-1 active:translate-y-1 active:shadow-pixel-sm focus:outline-none";

    const variants = {
        primary: "bg-retro-love text-white hover:bg-pink-600",
        secondary: "bg-retro-cyan text-black hover:bg-cyan-300",
        outline: "bg-retro-cream text-black hover:bg-gray-100",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default PixelButton;
