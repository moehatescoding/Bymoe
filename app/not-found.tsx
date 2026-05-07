import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-40 pb-20 text-center px-6 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-[80px] font-bold text-primary/10 mb-[-20px]">404</h1>
      <h2 className="text-[24px] font-semibold text-primary mb-4">Page Not Found</h2>
      <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="bg-primary text-on-primary px-10 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-sm"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
