'use client';
import { create } from 'zustand';

interface AudioStore {
  isMuted: boolean;
  isInitialized: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playStartup: () => void;
  initAudio: () => void;
}

// Keep references to Audio objects outside of React state to avoid issues
let ambienceAudio: HTMLAudioElement | null = null;
let hoverAudio: HTMLAudioElement | null = null;
let clickAudio: HTMLAudioElement | null = null;
let startupAudio: HTMLAudioElement | null = null;

export const useAudioStore = create<AudioStore>((set, get) => ({
  isMuted: true, // Always start muted as per requirements (no autoplay)
  isInitialized: false,

  initAudio: () => {
    if (typeof window === 'undefined' || get().isInitialized) return;

    // Initialize audio instances pointing to expected files in /public/sounds/
    // (We use try-catch when playing so missing files won't crash the app)
    ambienceAudio = new Audio('/sounds/garage-ambience.mp3');
    ambienceAudio.loop = true;
    ambienceAudio.volume = 0.15; // Subtle

    hoverAudio = new Audio('/sounds/ui-hover.mp3');
    hoverAudio.volume = 0.1;

    clickAudio = new Audio('/sounds/ui-click.mp3');
    clickAudio.volume = 0.2;

    startupAudio = new Audio('/sounds/z900-startup.mp3');
    startupAudio.volume = 0.4;

    set({ isInitialized: true });
  },

  toggleMute: () => {
    const state = get();
    if (!state.isInitialized) {
      state.initAudio();
    }

    const newMuted = !state.isMuted;
    set({ isMuted: newMuted });

    if (ambienceAudio) {
      if (!newMuted) {
        ambienceAudio.play().catch(() => {
          console.warn('Ambience audio file not found or playback prevented.');
        });
      } else {
        ambienceAudio.pause();
      }
    }
  },

  playHover: () => {
    if (get().isMuted || !hoverAudio) return;
    hoverAudio.currentTime = 0;
    hoverAudio.play().catch(() => {});
  },

  playClick: () => {
    if (get().isMuted || !clickAudio) return;
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  },

  playStartup: () => {
    if (get().isMuted || !startupAudio) return;
    startupAudio.currentTime = 0;
    startupAudio.play().catch(() => {});
  }
}));
