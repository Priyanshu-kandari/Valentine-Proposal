import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import RetroLayout from '../components/RetroLayout';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';
import Typewriter from '../components/Typewriter';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const ProposalPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const [proposalData, setProposalData] = useState({
        yourName: searchParams.get('yourName') || 'Player 1',
        partnerName: searchParams.get('partnerName') || 'Player 2',
        image: searchParams.get('image') || ''
    });

    const [step, setStep] = useState('loading'); // loading, intro, reveal, question, success
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const noBtnRef = useRef(null);
    const [isFetching, setIsFetching] = useState(!!id);

    // Fetch data if ID is present
    useEffect(() => {
        if (id) {
            fetch(`/api/proposals/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.error(data.error);
                        return;
                    }
                    setProposalData({
                        yourName: data.yourName,
                        partnerName: data.partnerName,
                        image: data.image
                    });
                })
                .catch(err => console.error(err))
                .finally(() => setIsFetching(false));
        }
    }, [id]);

    // Loading Animation
    useEffect(() => {
        if (step === 'loading' && !isFetching) {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStep('intro');
                        return 100;
                    }
                    return prev + 10; // Fast loading
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [step, isFetching]);

    const { yourName, partnerName, image } = proposalData;

    // "Not Yet" Button Evasion Logic
    const handleNoHover = () => {
        const x = Math.random() * 200 - 100; // Random x between -100 and 100
        const y = Math.random() * 200 - 100; // Random y between -100 and 100
        setNoBtnPosition({ x, y });
    };

    const handleYes = () => {
        setStep('success');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF94C2', '#B692F6', '#94E0FF']
        });
        // Trigger fireworks
        let duration = 5 * 1000;
        let animationEnd = Date.now() + duration;
        let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        let random = (min, max) => Math.random() * (max - min) + min;

        let interval = setInterval(function () {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            let particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const renderStep = () => {
        switch (step) {
            case 'loading':
                return (
                    <div className="text-center w-full max-w-md animate-pulse">
                        <h2 className="text-2xl mb-4 font-press-start">LOADING LOVE...</h2>
                        <div className="w-full h-8 border-4 border-black p-1">
                            <div
                                className="h-full bg-retro-love transition-all duration-300"
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-right">{loadingProgress}%</p>
                    </div>
                );

            case 'intro':
                return (
                    <PixelCard className="text-center max-w-lg animate-fade-in">
                        <h2 className="text-xl md:text-3xl font-press-start mb-6 leading-relaxed">
                            New Message from<br />
                            <span className="text-retro-purple">{yourName}</span> 💌
                        </h2>
                        <p className="text-xl mb-8 font-vt323">
                            "{yourName} has challenged you to a special quest!"
                        </p>
                        <PixelButton onClick={() => setStep('reveal')}>
                            Press Start to Continue 🎮
                        </PixelButton>
                    </PixelCard>
                );

            case 'reveal':
            case 'question':
                return (
                    <PixelCard className="text-center max-w-lg animate-fade-in relative">
                        <div className="mb-6 flex justify-center">
                            <div className="w-48 h-48 border-4 border-black p-1 bg-white shadow-pixel-lg relative">
                                {/* Decorative hearts */}
                                <div className="absolute -top-4 -right-4 text-retro-love text-2xl animate-bounce">💖</div>
                                <div className="absolute -bottom-4 -left-4 text-retro-cyan text-2xl animate-spin-slow">🌟</div>

                                {image ? (
                                    <img src={image} alt="Partner" className="w-full h-full object-cover pixelated" />
                                ) : (
                                    <div className="w-full h-full bg-retro-pink flex items-center justify-center">
                                        <Heart size={64} className="text-white animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {step === 'reveal' ? (
                            <div className="animate-slide-up">
                                <p className="text-2xl mb-6">
                                    "A wild gorgeous person appeared!"
                                </p>
                                <PixelButton onClick={() => setStep('question')}>
                                    Next ▶
                                </PixelButton>
                            </div>
                        ) : (
                            <div className="animate-slide-up bg-retro-cream border-4 border-black p-4 mb-6 text-left relative min-h-[150px]">
                                <div className="text-xl md:text-2xl leading-relaxed font-vt323">
                                    <p>Dear {partnerName},</p>
                                    <br />
                                    <Typewriter
                                        text={`You are my favorite player 2. Will you be my Valentine? 💖 -- ${yourName}`}
                                        speed={40}
                                    />
                                </div>
                                <div className="absolute bottom-2 right-2 animate-pulse">▼</div>
                            </div>
                        )}

                        {step === 'question' && (
                            <div className="flex gap-4 justify-center mt-8 relative h-16">
                                <PixelButton onClick={handleYes} className="z-10">
                                    YES 💖
                                </PixelButton>

                                <div
                                    style={{
                                        transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`,
                                        transition: 'all 0.2s ease py 0s'
                                    }}
                                    onMouseEnter={handleNoHover}
                                    className="z-0"
                                >
                                    <PixelButton variant="outline" className="opacity-80">
                                        Not Yet 🥺
                                    </PixelButton>
                                </div>
                            </div>
                        )}
                    </PixelCard>
                );

            case 'success':
                return (
                    <div className="text-center animate-bounce-in">
                        <h1 className="text-4xl md:text-6xl font-press-start text-retro-love mb-8 drop-shadow-pixel text-shadow">
                            LEVEL COMPLETE!
                        </h1>
                        <PixelCard className="max-w-md mx-auto">
                            <div className="text-6xl mb-4">💍💖</div>
                            <p className="text-2xl md:text-3xl mb-4">
                                {partnerName} SAID YES!
                            </p>
                            <p className="text-xl text-retro-purple">
                                New Quest Unlocked: Valentine's Date 🥂
                            </p>
                        </PixelCard>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <RetroLayout>
            {renderStep()}
        </RetroLayout>
    );
};

export default ProposalPage;
