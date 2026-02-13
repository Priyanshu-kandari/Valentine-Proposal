import React from 'react';

const PixelInput = ({ label, value, onChange, placeholder, type = 'text', className = '', id, accept }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label htmlFor={id} className="font-vt323 text-xl font-bold">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                accept={accept}
                className="font-vt323 text-lg p-3 border-4 border-black focus:outline-none focus:shadow-pixel focus:-translate-y-1 transition-all bg-retro-cream placeholder-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-press-start file:bg-retro-cyan file:text-black hover:file:bg-cyan-300"
            />
        </div>
    );
};

export default PixelInput;
