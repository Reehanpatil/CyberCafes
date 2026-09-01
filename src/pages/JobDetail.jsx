import { Link, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  CalendarDays,
  GraduationCap,
  User,
  IndianRupee,
} from "lucide-react";
import { useSiteData } from "../context/DataContext";
import { formatDate, formatSalary } from "../lib/icons";
import { getButtonClass } from "../lib/buttonStyles";
import JobDetailSkeleton from "../components/skeletons/JobDetailSkeleton";
import { usePageMeta } from "../hooks/usePageMeta";

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className='rounded-2xl border border-border bg-surface p-5 shadow-sm shadow-black/[0.03]'>
      <p className='flex items-center gap-2 font-semibold text-accent'>
        <Icon size={18} /> {title}
      </p>
      <div className='mt-2 text-sm text-ink space-y-1'>{children}</div>
    </div>
  );
}

export default function JobDetail() {
  const { categoryId, jobId } = useParams();
  const { data, initialized } = useSiteData();

  const job = data.jobs.find((j) => j.id === jobId);
  const autoDescription =
    job ?
      `${job.title} — ${job.location}. Last date: ${formatDate(job.lastDate)}. Salary: ${formatSalary(job.salaryMin, job.salaryMax)}.`
    : undefined;
  usePageMeta(job?.title, job?.metaDescription || autoDescription);

  if (!initialized) return <JobDetailSkeleton />;
  if (!job) return <Navigate to={`/${categoryId}`} replace />;

  return (
    <section className='max-w-4xl mx-auto px-6 py-10 content-reveal'>
      <div className='flex items-center justify-between mb-6'>
        <Link
          to={`/${categoryId}`}
          className='inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors'
        >
          <ChevronLeft size={18} /> Back
        </Link>
        <span className='text-xs font-medium px-3 py-1 rounded-full bg-tagbg text-tagtext'>
          {job.categories[0]}
        </span>
      </div>

      <h1 className='font-display font-extrabold text-3xl sm:text-4xl text-ink'>
        {job.title}
      </h1>
      <div className='mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted'>
        <span>📍 {job.location}</span>
        <span>Last: {formatDate(job.lastDate)}</span>
      </div>

      <div className='mt-8 grid sm:grid-cols-2 gap-4'>
        <InfoCard icon={CalendarDays} title='Important Dates'>
          <p>Start: {formatDate(job.startDate)}</p>
          <p>Last: {formatDate(job.lastDate)}</p>
          <p>Exam: {job.examDate}</p>
        </InfoCard>
        <InfoCard icon={GraduationCap} title='Eligibility'>
          <p>{job.eligibility}</p>
        </InfoCard>
        <InfoCard icon={User} title='Age Limit'>
          <p>
            {job.ageMin} - {job.ageMax} Years
          </p>
        </InfoCard>
        <InfoCard icon={IndianRupee} title='Salary'>
          <p>{formatSalary(job.salaryMin, job.salaryMax)}</p>
        </InfoCard>
      </div>

      {job.buttons?.length > 0 && (
        <div className='mt-8 flex flex-wrap gap-3'>
          {job.buttons.map((btn) => (
            <a
              key={btn.id}
              href={btn.url}
              target='_blank'
              rel='noreferrer'
              className={`flex-1 min-w-[160px] text-center py-3 rounded-lg font-semibold text-sm transition-opacity ${getButtonClass(btn.style)}`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
