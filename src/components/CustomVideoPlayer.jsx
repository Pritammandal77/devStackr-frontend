import React, { useRef, useEffect, useState } from "react";
import {
    FaPlay,
    FaPause,
    FaVolumeMute,
    FaVolumeUp,
    FaForward,
    FaBackward,
} from "react-icons/fa";

function CustomVideoPlayer({ videoSrc }) {

    //without this , the browser is showing not secure to my website , bacause video
    //url is coming from cloudinary which gives us video in http format
    const secureVideoUrl = videoSrc.replace("http://", "https://");

    console.log("asdasda", secureVideoUrl)

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const hideTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);

    // Handle visibility autoplay
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef.current;
                if (!video) return;

                if (entry.isIntersecting) {
                    video.play().then(() => {
                        setIsPlaying(true);
                    }).catch(() => { });
                } else {
                    video.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => containerRef.current && observer.unobserve(containerRef.current);
    }, []);

    // Auto-hide controls after 3s
    const startHideTimer = () => {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const handleUserInteraction = () => {
        setShowControls(true);
        startHideTimer();
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
        handleUserInteraction();
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setIsMuted(video.muted);
        handleUserInteraction();
    };

    const skip = (seconds) => {
        videoRef.current.currentTime += seconds;
        handleUserInteraction();
    };

    return (
        <div
            ref={containerRef}
            onClick={handleUserInteraction}
            className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden relative group"
        >
            <video
                ref={videoRef}
                src={secureVideoUrl}
                className="w-full h-auto object-cover"
                muted={isMuted}
                preload="auto"
                playsInline
            />

            {/* Overlay Controls */}
            {showControls && (
                <>
                    {/* Center Play/Pause */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <button
                            onClick={togglePlay}
                            className="bg-black/60 text-white text-3xl p-4 rounded-full hover:bg-black/80 transition pointer-events-auto"
                        >
                            {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
                        </button>
                    </div>

                    {/* Mute / Unmute (Bottom Right) */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition pointer-events-auto"
                        title="Mute/Unmute"
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>

                    {/* Skip Backward (Left Center) */}
                    <button
                        onClick={() => skip(-10)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition pointer-events-auto"
                        title="Rewind 10s"
                    >
                        <FaBackward />
                    </button>

                    {/* Skip Forward (Right Center) */}
                    <button
                        onClick={() => skip(10)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition pointer-events-auto"
                        title="Forward 10s"
                    >
                        <FaForward />
                    </button>
                </>
            )}
        </div>
    );
}

export default CustomVideoPlayer;
