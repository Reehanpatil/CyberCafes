import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Lock,
  LogOut,
  LayoutDashboard,
  ListTree,
  Briefcase,
  Landmark,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useSiteData } from "../../context/DataContext";
import ThemeToggle from "../../components/ui/ThemeToggle";

const SESSION_KEY = "cybercafe_admin_ok";
const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || "";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/categories", label: "Sections", icon: ListTree },
  { to: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { to: "/admin/services", label: "Services", icon: Landmark },
];

function PasscodeGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (value === PASSCODE && PASSCODE !== "") {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className='min-h-screen bg-page flex items-center justify-center px-6'>
      <form
        onSubmit={submit}
        className='w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-xl'
      >
        <span className='inline-flex items-center justify-center w-11 h-11 rounded-xl bg-tagbg text-accent'>
          <Lock size={20} />
        </span>
        <p className='mt-4 font-display font-bold text-lg text-ink'>
          Admin access
        </p>
        <p className='text-sm text-muted mt-1.5 leading-relaxed'>
          Enter the passcode to edit site content. This is a light gate, not a
          login system.
        </p>
        <input
          type='password'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder='Passcode'
          autoFocus
          className='w-full mt-5 bg-page border border-border rounded-lg px-4 py-3 text-ink focus:border-accent focus:outline-none'
        />
        {error && (
          <p className='text-red-500 text-xs mt-2'>
            Wrong passcode, try again.
          </p>
        )}
        <button
          type='submit'
          className='mt-5 w-full bg-accent text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity'
        >
          Unlock
        </button>
        <Link
          to='/'
          className='block text-center text-xs text-muted mt-4 hover:text-accent transition-colors'
        >
          ← Back to site
        </Link>
      </form>
    </div>
  );
}

function SyncBadge({ status }) {
  const config = {
    ready: { label: "Synced", dot: "bg-accent2" },
    saving: { label: "Saving…", dot: "bg-amber-400 animate-pulse" },
    loading: { label: "Loading…", dot: "bg-muted animate-pulse" },
    offline: { label: "Offline", dot: "bg-muted" },
    error: { label: "Error", dot: "bg-red-500" },
  }[status] || { label: status, dot: "bg-muted" };

  return (
    <span className='inline-flex items-center gap-2 text-xs font-medium text-muted'>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function SidebarContent({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useSiteData();

  return (
    <div className='flex flex-col h-full'>
      <div className='px-5 py-5 border-b border-border flex items-center justify-between'>
        <span className='font-display font-extrabold text-lg'>
          <span className='text-ink'>Cyber</span>
          <span className='text-accent'>Cafe</span>
        </span>
        <ThemeToggle />
      </div>

      <nav className='flex-1 px-3 py-4 space-y-1'>
        {NAV_ITEMS.map((item) => {
          const active =
            item.end ?
              location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ?
                  "bg-tagbg text-accent"
                : "text-muted hover:text-ink hover:bg-surface2"
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className='px-5 py-4 border-t border-border space-y-3'>
        <SyncBadge status={status} />
        <a
          href='/'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 text-xs font-medium text-muted hover:text-accent transition-colors'
        >
          <ExternalLink size={13} /> View live site
        </a>
        <button
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY);
            navigate("/");
          }}
          className='flex items-center gap-2 text-xs font-medium text-muted hover:text-red-500 transition-colors'
        >
          <LogOut size={13} /> Lock & exit
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
    setChecked(true);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    function handleClick(e) {
      if (drawerRef.current && !drawerRef.current.contains(e.target))
        setDrawerOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerOpen]);

  if (!checked) return null;
  if (!unlocked) return <PasscodeGate onUnlock={() => setUnlocked(true)} />;

  const currentLabel =
    NAV_ITEMS.find((n) =>
      n.end ? location.pathname === n.to : location.pathname.startsWith(n.to),
    )?.label || "Admin";

  return (
    <div className='min-h-screen bg-page flex'>
      <aside className='w-64 shrink-0 border-r border-border bg-surface hidden lg:block'>
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {drawerOpen && (
        <div className='fixed inset-0 z-[90] lg:hidden'>
          <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' />
          <div
            ref={drawerRef}
            className='absolute inset-y-0 left-0 w-72 bg-surface border-r border-border shadow-2xl animate-[slideIn_0.2s_ease-out]'
          >
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className='flex-1 flex flex-col min-w-0'>
        <div className='lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 border-b border-border bg-page/95 backdrop-blur'>
          <button
            onClick={() => setDrawerOpen(true)}
            className='text-ink'
            aria-label='Open menu'
          >
            <Menu size={22} />
          </button>
          <p className='font-display font-bold text-ink'>{currentLabel}</p>
          <ThemeToggle />
        </div>

        <main className='flex-1 px-5 sm:px-8 py-6 sm:py-8 max-w-5xl w-full mx-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
