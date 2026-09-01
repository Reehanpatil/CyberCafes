import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { useSiteData } from "../context/DataContext";
import { getServiceIcon } from "../lib/serviceIcons";
import { usePageMeta } from "../hooks/usePageMeta";
import CategoryListSkeleton from "../components/skeletons/CategoryListSkeleton";

export default function Services() {
  const { data, initialized } = useSiteData();
  const [query, setQuery] = useState("");
  usePageMeta(
    "Government Services",
    "Direct official links for Aadhaar, PAN, Voter ID, driving licence, gas connections and 40+ other government services.",
  );

  if (!initialized) return <CategoryListSkeleton />;

  const services = data.services || [];
  const trimmed = query.trim().toLowerCase();
  const filtered =
    trimmed ?
      services.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmed) ||
          s.description.toLowerCase().includes(trimmed),
      )
    : services;

  return (
    <section className='max-w-6xl mx-auto px-6 py-14 content-reveal'>
      <div className='max-w-xl'>
        <span className='inline-block text-xs font-medium px-3 py-1 rounded-full bg-tagbg text-tagtext'>
          Government Services
        </span>
        <h1 className='mt-4 font-display font-extrabold text-3xl sm:text-4xl text-ink'>
          Every government service, one click away
        </h1>
        <p className='mt-3 text-muted leading-relaxed'>
          Direct official links for Aadhaar, PAN, Voter ID, driving licence, gas
          connections and more — no need to hunt for the right site.
        </p>
      </div>

      <div className='relative mt-8 max-w-md'>
        <Search
          size={16}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-muted'
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search services…'
          className='w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none'
        />
      </div>

      <p className='mt-4 text-xs text-muted'>
        {filtered.length} service{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className='mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {filtered.map((s) => {
          const Icon = getServiceIcon(s.icon);
          return (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              className='group rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/[0.03] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-200'
            >
              <div className='flex items-start justify-between gap-3'>
                <span className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-white shrink-0'>
                  <Icon size={22} />
                </span>
                <ChevronRight
                  size={16}
                  className='text-muted mt-2 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0'
                />
              </div>
              <p className='mt-4 font-display font-bold text-ink leading-snug'>
                {s.name}
              </p>
              <p className='mt-1.5 text-sm text-muted leading-relaxed line-clamp-2'>
                {s.description}
              </p>
              <p className='mt-3 text-xs text-accent font-medium'>
                {s.sub_links?.length || 0} link
                {s.sub_links?.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className='col-span-full text-center text-muted py-16 text-sm'>
            No services match "{query}".
          </p>
        )}
      </div>
    </section>
  );
}
