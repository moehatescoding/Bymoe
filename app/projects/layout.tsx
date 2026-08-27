import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Things I'm Building | BYMOE",
  description: "Software, hardware, brands, and whatever else keeps me up at night.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
