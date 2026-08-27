import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work With Me | BYMOE',
  description: 'Working with brands, businesses and people who want to create something worth remembering.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
