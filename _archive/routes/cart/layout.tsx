import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Shopping Cart | bymoe',
  description: 'Review your selected items and place your order instantly via WhatsApp.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
