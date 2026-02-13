import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RetroLayout from '../components/RetroLayout';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';
import PixelInput from '../components/PixelInput';
import { Heart, Copy, Link as LinkIcon, Check } from 'lucide-react';

const CreatePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        yourName: '',
        partnerName: '',
        image: ''
    });
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
            };
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File too large! Please choose an image under 5MB.");
                return;
            }
            const dataUrl = await resizeImage(file);
            setFormData({ ...formData, image: dataUrl });
        }
    };

    const generateLink = async (e) => {
        e.preventDefault();
        if (!formData.yourName || !formData.partnerName) {
            alert("Please fill in both names!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/proposals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create proposal');
            }

            const data = await response.json();
            const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/proposal/${data.id}`;
            setGeneratedLink(url);
        } catch (error) {
            console.error(error);
            alert('Error creating proposal. Please ensure the backend server is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'A Pixel Surprise 💖',
                    text: 'I made something special for you...',
                    url: generatedLink,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            copyToClipboard();
        }
    };

    const visitLink = () => {
        window.location.href = generatedLink;
    };

    return (
        <RetroLayout>
            <PixelCard className="w-full max-w-lg animate-slide-up">
                <h2 className="text-2xl text-center mb-6 text-retro-love flex items-center justify-center gap-2">
                    <Heart className="fill-current" /> CONFIGURATION
                </h2>

                {!generatedLink ? (
                    <form onSubmit={generateLink} className="space-y-6">
                        <PixelInput
                            id="yourName"
                            label="Player 1 (You)"
                            placeholder="Type your name..."
                            value={formData.yourName}
                            onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                        />

                        <PixelInput
                            id="partnerName"
                            label="Player 2 (Partner)"
                            placeholder="Type their name..."
                            value={formData.partnerName}
                            onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                        />

                        <div className="flex flex-col gap-2">
                            <label className="font-vt323 text-xl font-bold">Upload Partner's Photo</label>
                            <PixelInput
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <p className="text-xs text-gray-500 font-vt323">*Images are saved locally</p>
                        </div>

                        {formData.image && (
                            <div className="flex justify-center my-4">
                                <div className="w-32 h-32 border-4 border-black p-1 bg-white shadow-pixel">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover pixelated"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <PixelButton
                                type="submit"
                                className="w-full text-lg"
                                variant="primary"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : "Create Love Link 💌"}
                            </PixelButton>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6 animate-fade-in text-center">
                        <h3 className="text-xl font-press-start text-retro-purple mb-4">Link Generated!</h3>

                        <div className="bg-retro-cream border-4 border-black p-4 break-all font-vt323 text-lg mb-4">
                            {generatedLink}
                        </div>

                        <div className="flex flex-col gap-4">
                            <PixelButton onClick={shareLink} variant="secondary" className="flex items-center justify-center gap-2">
                                {/* Share Icon logic could go here, defaulting to copy text if share api not supported */}
                                <Copy size={18} />
                                Share / Copy
                            </PixelButton>

                            <PixelButton onClick={visitLink} variant="outline" className="flex items-center justify-center gap-2">
                                <LinkIcon size={18} />
                                Test It Out
                            </PixelButton>

                            <PixelButton onClick={() => setGeneratedLink('')} variant="outline" className="text-sm opacity-50">
                                Create Another
                            </PixelButton>
                        </div>
                    </div>
                )}
            </PixelCard>
        </RetroLayout>
    );
};

export default CreatePage;
