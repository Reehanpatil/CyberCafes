import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "../icons/SocialIcons";
import { useSiteData } from "../../context/DataContext";
import ThemeToggle from "../ui/ThemeToggle";
import SearchBar from "../ui/SearchBar";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const SOCIALS = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: WhatsAppIcon, href: "https://wa.me/919000000000", label: "WhatsApp" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data } = useSiteData();
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleScroll() {
      setOpen(false);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  if (location.pathname.startsWith("/admin")) return null;

  return (
    <header className='sticky top-0 z-50 bg-page/90 backdrop-blur border-b border-border'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 relative'>
        <Link
          to='/'
          className='font-display font-extrabold text-xl tracking-tight'
        >
          <span className='text-ink'>Cyber</span>
          <span className='text-accent'>Cafe</span>
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to ?
                  "text-accent"
                : "text-ink hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='hidden sm:flex items-center gap-3'>
          <SearchBar />
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target='_blank'
              rel='noreferrer'
              aria-label={s.label}
              className='text-ink hover:text-accent transition-colors'
            >
              <s.icon size={19} />
            </a>
          ))}
          <span className='w-px h-5 bg-border mx-1' />
          <ThemeToggle />
        </div>

        <div className='flex sm:hidden items-center gap-2'>
          <SearchBar />
          <ThemeToggle />
          <button
            ref={buttonRef}
            className='text-ink'
            onClick={() => setOpen((v) => !v)}
            aria-label='Toggle menu'
            aria-expanded={open}
          >
            {open ?
              <X size={22} />
            : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav
            ref={menuRef}
            className='sm:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-xl border border-border bg-surface shadow-xl shadow-black/10 px-5 py-4 flex flex-col gap-3 animate-[fadeIn_0.15s_ease-out]'
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium py-1 ${
                  location.pathname === link.to ?
                    "text-accent"
                  : "text-ink hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className='flex items-center gap-4 pt-2 border-t border-border mt-1'>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={s.label}
                >
                  <s.icon size={19} className='text-ink' />
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
