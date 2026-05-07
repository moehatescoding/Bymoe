'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="pt-40 pb-20 text-center px-6 min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-[32px] font-semibold text-primary mb-4">Something went wrong!</h2>
      <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
        We encountered an unexpected error while loading this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => reset()} 
          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="bg-surface-container-low text-primary px-8 py-3 rounded-xl font-semibold hover:bg-surface-container-high transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
