import React from 'react';
import { useNavigate } from 'react-router-dom';
import RetroLayout from '../components/RetroLayout';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <RetroLayout>
            <div className="text-center space-y-8 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-press-start text-retro-love mb-2 drop-shadow-pixel">
                    PIXEL<br />VALENTINE 💖
                </h1>

                <PixelCard className="max-w-md mx-auto transform hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                        Create a surprise for your player 2
                    </p>

                    <PixelButton
                        onClick={() => navigate('/create')}
                        className="w-full text-lg animate-pulse"
                    >
                        Press Start 🎮
                    </PixelButton>
                </PixelCard>

                <p className="text-sm opacity-50 mt-8 font-vt323">
                    Ver 1.0 // Made with ❤️
                </p>
            </div>
        </RetroLayout>
    );
};

export default LandingPage;
