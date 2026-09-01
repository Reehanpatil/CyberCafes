import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft, ExternalLink, FileDown, Search } from "lucide-react";
import { useSiteData } from "../context/DataContext";
import { getServiceIcon } from "../lib/serviceIcons";
import { usePageMeta } from "../hooks/usePageMeta";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { data, initialized } = useSiteData();
  const [query, setQuery] = useState("");

  const service = (data.services || []).find((s) => s.id === serviceId);
  usePageMeta(service?.name, service?.description);

  if (!initialized) return null;
  if (!service) return <Navigate to='/services' replace />;

  const Icon = getServiceIcon(service.icon);
  const links = service.sub_links || [];
  const trimmed = query.trim().toLowerCase();
  const filteredLinks =
    trimmed ?
      links.filter((l) => l.label.toLowerCase().includes(trimmed))
    : links;

  return (
    <section className='max-w-3xl mx-auto px-6 py-10 content-reveal'>
      <Link
        to='/services'
        className='inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors'
      >
        <ChevronLeft size={18} /> Back
      </Link>

      <div className='mt-6 flex items-start gap-4'>
        <span className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-white shrink-0'>
          <Icon size={26} />
        </span>
        <div>
          <h1 className='font-display font-extrabold text-2xl sm:text-3xl text-ink leading-tight'>
            {service.name}
          </h1>
          <p className='mt-2 text-sm text-muted leading-relaxed'>
            {service.description}
          </p>
        </div>
      </div>

      <div className='mt-8 flex items-center justify-between gap-3'>
        <p className='text-xs font-semibold text-muted uppercase tracking-wide'>
          {links.length} link{links.length !== 1 ? "s" : ""}
        </p>
        {links.length > 8 && (
          <div className='relative w-48'>
            <Search
              size={14}
              className='absolute left-2.5 top-1/2 -translate-y-1/2 text-muted'
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Filter…'
              className='w-full bg-surface border border-border rounded-md pl-8 pr-2 py-1.5 text-xs text-ink focus:border-accent focus:outline-none'
            />
          </div>
        )}
      </div>

      <div className='mt-3 space-y-2'>
        {filteredLinks.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target='_blank'
            rel='noreferrer'
            className='flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent/50 hover:bg-surface2 transition-colors'
          >
            <span className='text-sm font-medium text-ink'>{link.label}</span>
            <span className='flex items-center gap-2 shrink-0'>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  link.type === "pdf" ?
                    "bg-amber-500/10 text-amber-500"
                  : "bg-tagbg text-tagtext"
                }`}
              >
                {link.type === "pdf" ? "PDF" : "Official"}
              </span>
              {link.type === "pdf" ?
                <FileDown size={15} className='text-muted' />
              : <ExternalLink size={15} className='text-muted' />}
            </span>
          </a>
        ))}
        {filteredLinks.length === 0 && (
          <p className='text-center text-muted py-10 text-sm'>
            No links match "{query}".
          </p>
        )}
      </div>
    </section>
  );
}
