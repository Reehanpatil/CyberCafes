import { useLocation } from "react-router-dom";
import { useSiteData } from "../../context/DataContext";

export default function Footer() {
  const { data } = useSiteData();
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;

  const author = data.cafe?.author || "Reehan MP";
  const [first, ...rest] = author.split(" ");

  return (
    <footer className='border-t border-border mt-20'>
      <div className='max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm'>
        <p className='font-semibold'>
          <span className='text-ink'>{first}</span>{" "}
          <span className='text-accent'>{rest.join(" ")}</span>
        </p>
        <p className='text-muted'>
          © {new Date().getFullYear()} All rights reserved
        </p>
        <p className='text-ink'>
          Daily Update:{" "}
          <span className='text-accent font-medium'>
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>
      </div>
    </footer>
  );
}
