import { useSiteData } from "../context/DataContext";
import CategoryCard from "../components/ui/CategoryCard";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  const { data, initialized } = useSiteData();

  usePageMeta();

  if (!initialized) return <HomeSkeleton />;

  return (
    <section className='max-w-6xl mx-auto px-6 py-14 content-reveal'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {data.categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
