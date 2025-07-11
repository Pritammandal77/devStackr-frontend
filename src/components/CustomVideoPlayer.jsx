import React, { useRef, useEffect, useState, useCallback } from "react";
import {
    FaPlay,
    FaPause,
    FaVolumeMute,
    FaVolumeUp,
    FaForward,
    FaBackward,
} from "react-icons/fa";

function CustomVideoPlayer({ videoSrc }) {
    const secureVideoUrl = videoSrc.replace("http://", "https://");
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const hideTimeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);

    // ✅ Lightweight visibility check without IntersectionObserver
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVisibility = () => {
            const rect = video.getBoundingClientRect();
            const fullyVisible =
                rect.top >= 0 &&
                rect.bottom <= window.innerHeight;

            if (fullyVisible) {
                video.play().catch(() => {});
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        };

        handleVisibility();
        window.addEventListener("scroll", handleVisibility);
        return () => window.removeEventListener("scroll", handleVisibility);
    }, []);

    // ✅ Auto-hide controls
    const startHideTimer = () => {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 2500);
    };

    const handleUserInteraction = () => {
        setShowControls(true);
        startHideTimer();
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

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
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
        handleUserInteraction();
    };

    const skip = (seconds) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime += seconds;
        handleUserInteraction();
    };

    return (
        <div
            ref={containerRef}
            onClick={handleUserInteraction}
            className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden relative bg-black"
        >
            <video
                ref={videoRef}
                src={secureVideoUrl}
                className="w-full h-auto"
                muted={isMuted}
                preload="metadata"
                playsInline
            />

            {showControls && (
                <>
                    {/* Play/Pause */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <button
                            onClick={togglePlay}
                            className="bg-black/60 text-white text-3xl p-3 rounded-full pointer-events-auto"
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                    </div>

                    {/* Mute */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full pointer-events-auto"
                        title="Mute/Unmute"
                    >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>

                    {/* Rewind */}
                    <button
                        onClick={() => skip(-10)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full pointer-events-auto"
                        title="Rewind 10s"
                    >
                        <FaBackward />
                    </button>

                    {/* Forward */}
                    <button
                        onClick={() => skip(10)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full pointer-events-auto"
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
