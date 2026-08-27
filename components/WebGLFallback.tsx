import Image from 'next/image';

export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-brand-black flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop"
          alt="BYMOE Motorcycle"
          fill
          className="object-cover opacity-50 grayscale"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="text-[10px] tracking-[0.3em] text-brand-white/50 uppercase mb-4">
          Hardware Limitation Detected
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-brand-white mb-6 uppercase">
          Interactive 3D Disabled
        </h2>
        <p className="text-sm text-brand-white/70 max-w-md mx-auto leading-relaxed">
          Your current device or browser configuration does not support WebGL. You are viewing the lightweight cinematic fallback experience.
        </p>
      </div>
    </div>
  );
}
