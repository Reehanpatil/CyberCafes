import { Link } from "react-router-dom";
import { getCategoryIcon } from "../../lib/icons";

export default function CategoryCard({ category }) {
  const Icon = getCategoryIcon(category.icon);
  return (
    <Link
      to={`/${category.id}`}
      className='group rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/[0.03] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-200'
    >
      <span className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-tagbg text-accent group-hover:scale-105 transition-transform'>
        <Icon size={22} />
      </span>
      <p className='mt-4 font-display font-bold text-ink'>{category.label}</p>
    </Link>
  );
}
