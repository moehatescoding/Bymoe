'use client';
import { MessageCircle } from 'lucide-react';
import { getBulkWhatsAppUrl } from '@/lib/whatsapp';
import { usePathname } from 'next/navigation';

export default function WhatsAppFAB() {
  const pathname = usePathname();
  
  if (pathname === '/checkout') return null;

  return (
    <a
      href={getBulkWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-wa-green text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-modal hover:bg-wa-green-dark transition-colors"
    >
      <MessageCircle size={20} />
      <span className="text-label-sm font-semibold tracking-wide hidden sm:inline">WhatsApp</span>
    </a>
  );
}
