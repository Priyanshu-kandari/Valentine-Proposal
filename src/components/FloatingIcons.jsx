import React, { useEffect, useState } from 'react';

const FloatingIcons = () => {
    const [icons, setIcons] = useState([]);

    const iconTypes = ['❤️', '💖', '💌', '🌟', '✨', '🎀', '🧸'];

    useEffect(() => {
        // Generate random icons
        const newIcons = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            char: iconTypes[Math.floor(Math.random() * iconTypes.length)],
            left: Math.random() * 100, // %
            top: Math.random() * 100, // %
            animationDuration: 5 + Math.random() * 10, // s
            delay: Math.random() * 5, // s
            size: 1 + Math.random() * 2, // ren
        }));
        setIcons(newIcons);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {icons.map((icon) => (
                <div
                    key={icon.id}
                    className="absolute animate-bounce-custom opacity-30"
                    style={{
                        left: `${icon.left}%`,
                        top: `${icon.top}%`,
                        fontSize: `${icon.size}rem`,
                        animationDuration: `${icon.animationDuration}s`,
                        animationDelay: `${icon.delay}s`,
                    }}
                >
                    {icon.char}
                </div>
            ))}
        </div>
    );
};

export default FloatingIcons;
