'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroAudioButtonProps {
  audioSrc?: string;
  className?: string;
}

export default function HeroAudioButton({
  audioSrc = '/audio/hero-voice.mp3',
  className = '',
}: HeroAudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsError(false);
    };

    const handleError = () => {
      setIsPlaying(false);
      setIsError(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // User gesture triggered
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsError(false);
        })
        .catch((err) => {
          console.warn('Audio play prevented or file not found:', err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Custom Pill Audio Button */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause exhaust sound' : 'Listen to Kawasaki Yoshimura exhaust sound'}
        className={`group relative flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none border backdrop-blur-xl ${
          isPlaying
            ? 'bg-[#39FF14]/15 border-[#39FF14]/60 text-white shadow-[0_0_25px_rgba(57,255,20,0.2)]'
            : 'bg-black/50 border-white/15 text-white/80 hover:text-white hover:border-[#39FF14]/50 hover:bg-black/70 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] active:scale-[0.97]'
        }`}
      >
        {/* Left Icon / Animated Waveform Equalizer */}
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          {isPlaying ? (
            /* 4-bar animated equalizer */
            <div className="flex items-end justify-center gap-0.5 h-3.5 w-4">
              <motion.span
                className="w-0.5 rounded-full bg-[#39FF14]"
                animate={{ height: ['25%', '100%', '40%', '80%', '25%'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="w-0.5 rounded-full bg-[#39FF14]"
                animate={{ height: ['70%', '30%', '100%', '50%', '70%'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              />
              <motion.span
                className="w-0.5 rounded-full bg-[#39FF14]"
                animate={{ height: ['40%', '90%', '20%', '100%', '40%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />
              <motion.span
                className="w-0.5 rounded-full bg-[#39FF14]"
                animate={{ height: ['90%', '40%', '75%', '30%', '90%'] }}
                transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              />
            </div>
          ) : (
            /* Sound / Volume Wave Icon */
            <svg
              className="w-4 h-4 text-[#39FF14] group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </div>

        {/* Button Label */}
        <span className="font-semibold tracking-widest text-[11px] sm:text-xs">
          {isPlaying ? 'Pause Exhaust' : 'Listen to Exhaust'}
        </span>

        {/* Subtle status dot / playing pulse */}
        {isPlaying && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]" />
          </span>
        )}
      </button>
    </div>
  );
}
