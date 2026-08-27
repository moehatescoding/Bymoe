'use client';
import dynamic from 'next/dynamic';

const MotorcycleViewer = dynamic(() => import('@/components/MotorcycleViewer'), {
  ssr: false,
});

export default function ClientMotorcycleViewer() {
  return <MotorcycleViewer />;
}
