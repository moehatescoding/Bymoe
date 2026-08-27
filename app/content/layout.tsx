import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What I'm Up To | BYMOE",
  description: "Probably building, riding, filming or overthinking something.",
};

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
