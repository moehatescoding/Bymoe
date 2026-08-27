import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who's Moe? | BYMOE",
  description: "I make things, break things, ride things and occasionally figure them out.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
