import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSiteData } from "../context/DataContext";
import JobCard from "../components/ui/JobCard";
import CategoryListSkeleton from "../components/skeletons/CategoryListSkeleton";
import { usePageMeta } from "../hooks/usePageMeta";

export default function CategoryList() {
  const { categoryId } = useParams();
  const { data, initialized } = useSiteData();

  const category = data.categories.find((c) => c.id === categoryId);
  usePageMeta(
    category?.label,
    category ?
      `${category.label} — latest listings, updated regularly on CyberCafe.`
    : undefined,
  );

  if (!initialized) return <CategoryListSkeleton />;
  if (!category) return <Navigate to='/' replace />;

  const jobs = data.jobs.filter((j) => j.categories.includes(categoryId));

  return (
    <section className='max-w-6xl mx-auto px-6 py-10 content-reveal'>
      <div className='flex items-center justify-between mb-8'>
        <Link
          to='/'
          className='inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors'
        >
          <ChevronLeft size={18} /> Back
        </Link>
        <h1 className='font-display font-bold text-2xl text-ink'>
          {category.label}
        </h1>
        <span className='w-14 hidden sm:block' />
      </div>

      {jobs.length === 0 ?
        <p className='text-center text-muted py-16'>
          No listings here yet — check back soon.
        </p>
      : <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} categoryId={categoryId} />
          ))}
        </div>
      }
    </section>
  );
}
