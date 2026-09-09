import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/data/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Inline text parser for bold, italics, and code
function formatInlineText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-white/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-[#39FF14] font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Markdown parser for comprehensive long-form articles
function renderContent(raw: string) {
  const lines = raw.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      const [header, , ...rows] = tableRows;
      elements.push(
        <div key={`table-${key}`} className="my-8 overflow-x-auto rounded-xl border border-white/10 bg-brand-surface p-4 shadow-lg">
          <table className="w-full text-left text-xs sm:text-sm">
            {header && (
              <thead>
                <tr className="border-b border-white/10 text-white font-semibold">
                  {header.map((th, i) => (
                    <th key={i} className="pb-3 px-3">
                      {formatInlineText(th.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-white/5 last:border-0 text-white/70">
                  {row.map((td, cIdx) => (
                    <td key={cIdx} className="py-3 px-3">
                      {formatInlineText(td.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('|')) {
      inTable = true;
      const cols = trimmed.split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
      tableRows.push(cols);
      return;
    } else if (inTable) {
      flushTable(idx);
    }

    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 tracking-tight border-b border-white/10 pb-3">
          {formatInlineText(trimmed.replace('## ', ''))}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-9 mb-3 tracking-tight">
          {formatInlineText(trimmed.replace('### ', ''))}
        </h3>
      );
    } else if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4 key={idx} className="text-base sm:text-lg font-semibold text-[#39FF14] mt-6 mb-2 tracking-wide uppercase font-mono text-xs">
          {formatInlineText(trimmed.replace('#### ', ''))}
        </h4>
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={idx} className="my-8 pl-5 border-l-2 border-[#39FF14] bg-white/[0.02] py-3 pr-4 rounded-r-xl text-base sm:text-lg italic text-white/90 font-light leading-relaxed">
          {formatInlineText(trimmed.replace('> ', ''))}
        </blockquote>
      );
    } else if (trimmed === '---') {
      elements.push(<hr key={idx} className="my-10 border-white/10" />);
    } else if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <div key={idx} className="flex gap-3 text-sm sm:text-base text-white/70 font-light leading-relaxed my-2.5 pl-2">
          <span className="font-mono text-[#39FF14] font-semibold flex-shrink-0">{trimmed.split('.')[0]}.</span>
          <div>{formatInlineText(trimmed.replace(/^\d+\.\s/, ''))}</div>
        </div>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <div key={idx} className="flex gap-3 text-sm sm:text-base text-white/70 font-light leading-relaxed my-2 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] mt-2.5 flex-shrink-0" />
          <div>{formatInlineText(trimmed.slice(2))}</div>
        </div>
      );
    } else if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
      elements.push(
        <p key={idx} className="text-xs sm:text-sm text-white/40 italic leading-relaxed my-4">
          {formatInlineText(trimmed.slice(1, -1))}
        </p>
      );
    } else {
      elements.push(
        <p key={idx} className="text-sm sm:text-base text-white/70 font-light leading-relaxed my-4 text-justify sm:text-left">
          {formatInlineText(trimmed)}
        </p>
      );
    }
  });

  if (inTable) {
    flushTable(lines.length);
  }

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const isRideStory = post.category.toLowerCase().includes('ride') || post.category.toLowerCase().includes('travel') || post.category.toLowerCase().includes('story');

  return (
    <main className="min-h-screen bg-brand-black pb-32 pt-20 sm:pt-28 px-4 sm:px-8 max-w-5xl mx-auto overflow-x-hidden">
      
      {/* Back button */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[#00ff66] transition-colors cursor-pointer"
        >
          <span>← BACK TO LOGBOOK</span>
        </Link>
      </div>

      {/* Header info */}
      <header className="mb-8 sm:mb-12 text-left border-b border-white/[0.08] pb-8 sm:pb-10">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <span className={isRideStory ? 'hud-tag-amber' : 'hud-tag'}>
            {post.category}
          </span>
          {post.isSample && (
            <span className="px-2.5 py-1 rounded-md text-[9px] font-mono tracking-wider uppercase bg-white/10 text-white/50 border border-white/10">
              SAMPLE ENTRY
            </span>
          )}
          <span className="text-xs font-mono text-white/40">
            {post.date} // {post.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.98] mb-4 sm:mb-6">
          {post.title}
        </h1>

        <p className="text-sm sm:text-xl text-white/70 font-light leading-relaxed border-l-2 border-[#00ff66] pl-3.5 sm:pl-5 my-4 sm:my-6">
          {post.excerpt}
        </p>

        {/* Author & Telemetry info */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-center font-display font-black text-sm text-[#00ff66]">
              {post.author.name[0]}
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider">{post.author.name}</div>
              <div className="text-[11px] font-mono text-white/40">{post.author.role}</div>
            </div>
          </div>

          <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
            STATUS // VERIFIED LOG
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-14 shadow-2xl bg-brand-surface">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />
      </div>

      {/* Main Body with readable line-length */}
      <article className="max-w-3xl mx-auto text-white/80">
        {renderContent(post.content)}
      </article>

      {/* Footer CTA & Related Strip */}
      <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-white/10">
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            ← ALL DISPATCHES
          </Link>
          <Link
            href="/products"
            className="font-mono text-xs uppercase tracking-widest text-[#00ff66] hover:underline"
          >
            EXPLORE TESTED GEAR →
          </Link>
        </div>

        {/* Related Posts Grid */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mb-6">
              RELATED <span className="text-[#00ff66]">DISPATCHES</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  data-cursor="READ"
                  className="editorial-grade group block rounded-xl overflow-hidden border border-white/10 bg-brand-surface hover:border-[#00ff66]/40 p-4 transition-all duration-300"
                >
                  <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={rPost.coverImage}
                      alt={rPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-[#00ff66] uppercase mb-1">
                    {rPost.category}
                  </div>
                  <h4 className="font-display text-base font-bold uppercase text-white group-hover:text-[#00ff66] transition-colors line-clamp-2">
                    {rPost.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
