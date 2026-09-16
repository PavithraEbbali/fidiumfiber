import Link from 'next/link';
import React from 'react';
import { SITE } from '@/lib/content';
import { resolveTokens, type LegalBlock, type LegalDoc } from '@/lib/legal';
import { CallNumberButton } from '@/components/primitives/CallButton';
import Reveal from '@/components/primitives/Reveal';

/* -------------------------------------------------------------------------- */
/*  Inline text renderer                                                      */
/* -------------------------------------------------------------------------- */

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const EMAIL_RE = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

/**
 * Resolves {tokens}, then turns `[text](/route)` into real links and bare email
 * addresses into mailto links. Everything is built from React nodes — no
 * dangerouslySetInnerHTML anywhere in the legal pages.
 */
function LegalText({ text }: { text: string }) {
  const resolved = resolveTokens(text);
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  // Plain runs get a second pass for email addresses.
  const pushPlain = (chunk: string) => {
    if (!chunk) return;
    const parts = chunk.split(EMAIL_RE);
    parts.forEach((part) => {
      if (!part) return;
      if (EMAIL_RE.test(part) && part.includes('@')) {
        nodes.push(
          <a key={`e${key++}`} href={`mailto:${part}`}>
            {part}
          </a>
        );
      } else {
        nodes.push(<React.Fragment key={`t${key++}`}>{part}</React.Fragment>);
      }
      EMAIL_RE.lastIndex = 0;
    });
  };

  LINK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = LINK_RE.exec(resolved)) !== null) {
    pushPlain(resolved.slice(cursor, match.index));
    const [, label, href] = match;
    nodes.push(
      <Link key={`l${key++}`} href={href}>
        {label}
      </Link>
    );
    cursor = match.index + match[0].length;
  }
  pushPlain(resolved.slice(cursor));

  return <>{nodes}</>;
}

/* -------------------------------------------------------------------------- */
/*  Block renderer                                                            */
/* -------------------------------------------------------------------------- */

function Block({ block }: { block: LegalBlock }) {
  if (block.type === 'h') {
    return (
      <h2 id={slugify(block.text)}>
        <LegalText text={block.text} />
      </h2>
    );
  }

  if (block.type === 'ul') {
    return (
      <ul>
        {block.items.map((item, i) => (
          <li key={i}>
            <LegalText text={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p>
      <LegalText text={block.text} />
    </p>
  );
}

export function slugify(text: string): string {
  return resolveTokens(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* -------------------------------------------------------------------------- */
/*  Page shell                                                                */
/* -------------------------------------------------------------------------- */

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const headings = doc.blocks.filter(
    (b): b is Extract<LegalBlock, { type: 'h' }> => b.type === 'h'
  );

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------ head */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50/70">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-[360px] w-[360px] rounded-full bg-lime/15 blur-[110px]"
        />

        <div className="container-x relative py-14 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.82rem] font-bold text-fidium-600 transition-colors hover:text-fidium-700"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to plans
          </Link>

          <h1 className="h-section mt-5 max-w-[42rem] text-ink">{doc.title}</h1>
          <p className="body-lg mt-4 max-w-[44rem] text-slate-600">
            <LegalText text={doc.intro} />
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------ body */}
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
          <article className="legal-prose min-w-0 max-w-[46rem]">
            {doc.summary ? (
              <Reveal y={14}>
                <div className="mb-9 rounded-2xl border border-fidium/25 bg-fidium/6 p-5 sm:p-6">
                  <p className="!mt-0 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-fidium-700">
                    In short
                  </p>
                  <p className="!mt-2 !text-[0.92rem] !text-slate-700">
                    <LegalText text={doc.summary} />
                  </p>
                </div>
              </Reveal>
            ) : null}

            {doc.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          {/* --------------------------------------------------- sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            {headings.length > 1 ? (
              <nav
                aria-label="On this page"
                className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
              >
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                  On this page
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${slugify(h.text)}`}
                        className="text-[0.82rem] font-semibold leading-snug text-slate-600 transition-colors hover:text-fidium-600"
                      >
                        {resolveTokens(h.text)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                Questions
              </p>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-slate-600">
                Reach our sales team for anything about plans, availability or a
                new order.
              </p>
              <CallNumberButton
                variant="primary"
                source="legal-sidebar"
                className="mt-5 w-full !text-[0.85rem]"
              />
              <p className="mt-3 text-center text-[0.75rem] font-medium text-slate-500">
                {SITE.hours}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default LegalPage;
