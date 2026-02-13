import React from 'react';

const RetroLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-retro-cream relative overflow-hidden font-vt323 selection:bg-retro-pink selection:text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#2D2D2D 1px, transparent 1px), radial-gradient(#FF3366 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                }}
            ></div>

            {/* Floating Elements (Decorative) */}
            <div className="absolute top-10 left-10 animate-pulse text-retro-love text-4xl">♥</div>
            <div className="absolute bottom-20 right-20 animate-bounce text-retro-purple text-4xl">★</div>
            <div className="absolute top-1/2 left-5 animate-ping text-retro-cyan text-2xl">✦</div>

            <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default RetroLayout;
