import Skeleton from "../ui/Skeleton";

export default function HomeSkeleton() {
  return (
    <section className='max-w-6xl mx-auto px-6 py-14'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/[0.03]'
          >
            <Skeleton className='w-12 h-12 rounded-xl' />
            <Skeleton className='h-5 w-2/3 mt-5' />
          </div>
        ))}
      </div>
    </section>
  );
}
