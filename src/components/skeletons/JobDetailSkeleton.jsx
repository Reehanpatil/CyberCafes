import Skeleton from "../ui/Skeleton";

export default function JobDetailSkeleton() {
  return (
    <section className='max-w-4xl mx-auto px-6 py-10'>
      <div className='flex items-center justify-between mb-6'>
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-5 w-20 rounded-full' />
      </div>

      <Skeleton className='h-9 w-3/4' />
      <div className='mt-3 flex gap-4'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-32' />
      </div>

      <div className='mt-8 grid sm:grid-cols-2 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='rounded-2xl border border-border bg-surface p-5 shadow-sm shadow-black/[0.03]'
          >
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3.5 w-3/4 mt-3' />
            <Skeleton className='h-3.5 w-1/2 mt-2' />
          </div>
        ))}
      </div>

      <div className='mt-8 flex flex-wrap gap-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-11 flex-1 min-w-[160px] rounded-lg' />
        ))}
      </div>
    </section>
  );
}
