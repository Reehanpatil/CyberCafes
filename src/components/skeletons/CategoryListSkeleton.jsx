import Skeleton from "../ui/Skeleton";

export default function CategoryListSkeleton() {
  return (
    <section className='max-w-6xl mx-auto px-6 py-10'>
      <div className='flex items-center justify-between mb-8'>
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-7 w-40' />
        <span className='w-14 hidden sm:block' />
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/[0.03]'
          >
            <Skeleton className='h-5 w-3/4' />
            <div className='mt-3 space-y-2'>
              <Skeleton className='h-3.5 w-1/2' />
              <Skeleton className='h-3.5 w-2/5' />
            </div>
            <div className='mt-4 flex items-center justify-between'>
              <Skeleton className='h-5 w-20 rounded-full' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
