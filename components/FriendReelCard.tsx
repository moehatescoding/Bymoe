'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { FriendContent } from '@/data/friends';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

interface FriendReelCardProps {
  friend: FriendContent;
  index: number;
}

export default function FriendReelCard({ friend, index }: FriendReelCardProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "-10%" }); // Triggers slightly before/after full visibility
  const prefersReducedMotion = useReducedMotion();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const { playHover, playClick } = useAudioStore();

  useEffect(() => {
    if (!videoRef.current || !friend.videoSrc) return;

    if (isInView && !prefersReducedMotion) {
      // Play when in view
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented or interrupted, this is normal on some mobile browsers
          console.log('Video autoplay prevented:', error);
        });
      }
    } else {
      // Pause when out of view to save CPU/battery
      videoRef.current.pause();
    }
  }, [isInView, prefersReducedMotion, friend.videoSrc]);

  return (
    <motion.a
      ref={containerRef}
      href={friend.reelUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playHover}
      onClick={() => {
        playClick();
        trackEvent('click_friend_reel', { handle: friend.handle });
      }}
      className="relative block w-full aspect-[9/16] bg-brand-surface rounded-sm overflow-hidden group border border-brand-white/5 hover:border-brand-white/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="PLAY"
    >
      {/* Fallback / Loading Thumbnail */}
      {(!isVideoLoaded || prefersReducedMotion || !friend.videoSrc) && (
        <Image
          src={friend.thumbnailSrc}
          alt={`Thumbnail for ${friend.handle}`}
          fill
          sizes="(max-width: 768px) 80vw, 33vw"
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        />
      )}

      {/* Background Video */}
      {!prefersReducedMotion && friend.videoSrc && (
        <video
          ref={videoRef}
          src={friend.videoSrc}
          muted
          loop
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-60 group-hover:opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent pointer-events-none">
        <h3 className="text-sm md:text-base font-bold text-brand-white tracking-wide mb-1">
          {friend.name}
        </h3>
        <p className="text-[10px] tracking-widest text-brand-white/80 uppercase font-medium mb-3">
          {friend.handle}
        </p>
        <p className="text-xs text-brand-white/60 font-light leading-relaxed line-clamp-2">
          {friend.context}
        </p>
      </div>
    </motion.a>
  );
}
