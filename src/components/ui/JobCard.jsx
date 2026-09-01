import { Link } from "react-router-dom";
import { MapPin, CalendarDays } from "lucide-react";
import { formatDate, formatSalary } from "../../lib/icons";

export default function JobCard({ job, categoryId }) {
  return (
    <Link
      to={`/${categoryId}/${job.id}`}
      className='block rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/[0.03] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-200'
    >
      <h3 className='font-display font-bold text-lg text-ink'>{job.title}</h3>
      <div className='mt-3 space-y-1.5 text-sm text-muted'>
        <p className='flex items-center gap-2'>
          <MapPin size={15} className='text-accent shrink-0' /> {job.location}
        </p>
        <p className='flex items-center gap-2'>
          <CalendarDays size={15} className='text-accent shrink-0' />{" "}
          {formatDate(job.lastDate)}
        </p>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <span className='text-xs font-medium px-3 py-1 rounded-full bg-tagbg text-tagtext'>
          {job.categories[0]}
        </span>
        <span className='text-sm font-semibold text-ink'>
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
      </div>
    </Link>
  );
}
