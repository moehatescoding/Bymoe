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

  return (
    <main className="min-h-screen bg-brand-black pb-32 pt-28 px-5 sm:px-8 max-w-4xl mx-auto overflow-x-hidden">
      
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span>← Back to Logbook</span>
        </Link>
      </div>

      {/* Header info */}
      <header className="mb-10 text-left">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30">
            {post.category}
          </span>
          {post.isSample && (
            <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase bg-white/10 text-white/60 border border-white/10">
              Sample Entry
            </span>
          )}
          <span className="text-xs font-mono text-white/40">
            {post.date} • {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed border-l border-white/20 pl-4 my-6">
          {post.excerpt}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-3 pt-6 border-t border-white/10">
          <div className="w-10 h-10 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/40 flex items-center justify-center font-bold text-xs text-[#39FF14]">
            {post.author.name[0]}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{post.author.name}</div>
            <div className="text-[11px] text-white/40">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-12 shadow-2xl bg-brand-surface">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
      </div>

      {/* Main Body with readable line-length */}
      <article className="max-w-2xl mx-auto">
        {renderContent(post.content)}
      </article>

      {/* Footer navigation */}
      <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/blog"
          className="text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
        >
          ← All Logbook Entries
        </Link>
        <Link
          href="/products"
          className="text-xs font-bold tracking-widest uppercase text-[#39FF14] hover:underline"
        >
          Explore Products →
        </Link>
      </div>

    </main>
  );
}
