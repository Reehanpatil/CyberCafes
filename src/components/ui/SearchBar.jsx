import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, MapPin, ChevronRight } from "lucide-react";
import { useSiteData } from "../../context/DataContext";
import { formatSalary } from "../../lib/icons";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data } = useSiteData();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
    setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const trimmed = query.trim().toLowerCase();
  const results =
    trimmed ?
      data.jobs
        .filter(
          (j) =>
            j.title.toLowerCase().includes(trimmed) ||
            j.location.toLowerCase().includes(trimmed),
        )
        .slice(0, 6)
    : [];

  function goTo(job) {
    setOpen(false);
    navigate(`/${job.categories[0] || "latest-jobs"}/${job.id}`);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label='Search jobs'
        className='text-ink hover:text-accent transition-colors'
      >
        <Search size={19} />
      </button>

      {open && (
        <div className='fixed inset-0 z-[200] flex items-start justify-center pt-10 px-4'>
          <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
          <div
            ref={boxRef}
            className='relative w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden animate-[fadeIn_0.15s_ease-out]'
          >
            <div className='flex items-center gap-3 px-4 py-3.5 border-b border-border'>
              <Search size={18} className='text-muted shrink-0' />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search jobs by title or location…'
                className='flex-1 bg-transparent text-ink placeholder:text-muted focus:outline-none text-sm'
              />
              <button
                onClick={() => setOpen(false)}
                aria-label='Close search'
                className='text-muted hover:text-ink transition-colors'
              >
                <X size={18} />
              </button>
            </div>

            <div className='max-h-80 overflow-y-auto'>
              {trimmed === "" && (
                <p className='px-4 py-10 text-center text-sm text-muted'>
                  Start typing to search jobs…
                </p>
              )}
              {trimmed !== "" && results.length === 0 && (
                <p className='px-4 py-10 text-center text-sm text-muted'>
                  No jobs found for "{query}"
                </p>
              )}
              {results.map((job) => (
                <button
                  key={job.id}
                  onClick={() => goTo(job)}
                  className='w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface2 transition-colors border-b border-border last:border-0'
                >
                  <div className='min-w-0'>
                    <p className='text-sm font-medium text-ink truncate'>
                      {job.title}
                    </p>
                    <p className='text-xs text-muted flex items-center gap-1 mt-0.5'>
                      <MapPin size={11} className='shrink-0' /> {job.location} ·{" "}
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </p>
                  </div>
                  <ChevronRight size={16} className='text-muted shrink-0' />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
