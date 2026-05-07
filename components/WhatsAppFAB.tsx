'use client';
import { MessageCircle } from 'lucide-react';
import { getBulkWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppFAB() {
  return (
    <a
      href={getBulkWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-50 bg-wa-green text-white rounded-full px-5 py-3 items-center gap-2 shadow-modal hover:bg-wa-green-dark transition-colors"
    >
      <MessageCircle size={20} />
      <span className="text-label-sm font-semibold tracking-wide hidden sm:inline">WhatsApp</span>
    </a>
  );
}
