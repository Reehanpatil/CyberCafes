import { Link } from "react-router-dom";
import {
  Briefcase,
  ListTree,
  AlertCircle,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useSiteData } from "../../context/DataContext";
import { getCategoryIcon, formatDate } from "../../lib/icons";

function StatCard({ icon: Icon, label, value, tone = "accent" }) {
  const tones = {
    accent: "bg-tagbg text-accent",
    warn: "bg-amber-500/10 text-amber-500",
  };
  return (
    <div className='rounded-2xl border border-border bg-surface p-5'>
      <span
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${tones[tone]}`}
      >
        <Icon size={18} />
      </span>
      <p className='mt-4 text-2xl font-display font-extrabold text-ink'>
        {value}
      </p>
      <p className='text-sm text-muted mt-0.5'>{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const { data, status, error } = useSiteData();
  const jobs = data.jobs;
  const categories = data.categories;

  const jobsMissingButtons = jobs.filter(
    (j) => !j.buttons || j.buttons.length === 0,
  ).length;
  const today = new Date();
  const expiredJobs = jobs.filter(
    (j) => j.lastDate && new Date(j.lastDate) < today,
  ).length;

  const maxCount = Math.max(
    1,
    ...categories.map(
      (c) => jobs.filter((j) => j.categories.includes(c.id)).length,
    ),
  );

  const recentJobs = [...jobs].slice(-4).reverse();

  return (
    <div>
      <div className='flex items-start justify-between gap-4 flex-wrap'>
        <div>
          <h1 className='font-display font-extrabold text-2xl text-ink'>
            Dashboard
          </h1>
          <p className='text-muted text-sm mt-1'>
            Overview of everything on the site.
          </p>
        </div>
        <Link
          to='/admin/jobs'
          className='inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg bg-accent text-white hover:opacity-90 transition-opacity'
        >
          Manage jobs <ArrowUpRight size={15} />
        </Link>
      </div>

      {status === "offline" && (
        <div className='mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-500'>
          Not connected to GitHub — editing local defaults only. Set
          VITE_GITHUB_* env vars to enable saving.
          {error && (
            <span className='block text-muted mt-1 text-xs'>{error}</span>
          )}
        </div>
      )}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
        <StatCard icon={Briefcase} label='Total jobs' value={jobs.length} />
        <StatCard icon={ListTree} label='Sections' value={categories.length} />
        <StatCard
          icon={Clock}
          label='Past last date'
          value={expiredJobs}
          tone={expiredJobs ? "warn" : "accent"}
        />
        <StatCard
          icon={AlertCircle}
          label='No buttons set'
          value={jobsMissingButtons}
          tone={jobsMissingButtons ? "warn" : "accent"}
        />
      </div>

      <div className='grid lg:grid-cols-2 gap-5 mt-8'>
        <div className='rounded-2xl border border-border bg-surface p-5'>
          <p className='font-display font-bold text-ink mb-4'>
            Jobs per section
          </p>
          <div className='space-y-3'>
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              const count = jobs.filter((j) =>
                j.categories.includes(cat.id),
              ).length;
              return (
                <div key={cat.id}>
                  <div className='flex items-center justify-between text-sm mb-1'>
                    <span className='flex items-center gap-2 text-ink'>
                      <Icon size={14} className='text-accent' /> {cat.label}
                    </span>
                    <span className='text-muted'>{count}</span>
                  </div>
                  <div className='h-1.5 rounded-full bg-surface2 overflow-hidden'>
                    <div
                      className='h-full rounded-full bg-accent transition-all'
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {categories.length === 0 && (
              <p className='text-sm text-muted'>No sections yet.</p>
            )}
          </div>
        </div>

        <div className='rounded-2xl border border-border bg-surface p-5'>
          <p className='font-display font-bold text-ink mb-4'>
            Recently added jobs
          </p>
          <div className='space-y-1'>
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                to='/admin/jobs'
                className='flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg hover:bg-surface2 transition-colors'
              >
                <div>
                  <p className='text-sm font-medium text-ink'>
                    {job.title || "Untitled job"}
                  </p>
                  <p className='text-xs text-muted'>
                    {job.location || "No location"}
                  </p>
                </div>
                <span className='text-xs text-muted'>
                  {formatDate(job.lastDate)}
                </span>
              </Link>
            ))}
            {recentJobs.length === 0 && (
              <p className='text-sm text-muted'>No jobs yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
