'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  images: string[];
  name: string;
  inStock: boolean;
}

export default function ProductGallery({ images, name, inStock }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-base">
      {/* Main Image */}
      <div className="bg-surface-variant rounded-xl overflow-hidden aspect-[4/3] relative group cursor-crosshair">
        <Image 
          src={images[activeIndex]} 
          alt={`${name} view ${activeIndex + 1}`} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          priority 
          sizes="(max-width:1024px) 100vw, 58vw" 
        />
        {!inStock && (
          <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
            <span className="bg-primary text-on-primary px-6 py-3 rounded-full text-[16px] font-semibold">Sold Out</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-base">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative bg-surface-variant rounded-lg overflow-hidden aspect-square transition-all duration-300",
              activeIndex === i 
                ? "ring-2 ring-primary ring-offset-2 opacity-100 scale-95" 
                : "opacity-60 hover:opacity-100 hover:scale-105"
            )}
          >
            <Image 
              src={img} 
              alt={`${name} thumbnail ${i+1}`} 
              fill 
              className="object-cover" 
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
