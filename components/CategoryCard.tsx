import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/categories';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="group block rounded-xl overflow-hidden relative aspect-[4/5] bg-surface-container-low md:img-zoom shadow-card hover:shadow-card-hover transition-shadow">
      <Image src={category.image} alt={category.name} fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-[18px] font-semibold leading-tight">{category.name}</h3>
        <p className="text-white/70 text-label-sm mt-0.5">{category.productCount} items</p>
      </div>
    </Link>
  );
}
