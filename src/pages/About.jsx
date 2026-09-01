import {
  Bell,
  Monitor,
  ShieldCheck,
  Users,
  Wifi,
  Printer,
  FileEdit,
  CreditCard,
  Wallet,
  FileBadge,
} from "lucide-react";
import { useSiteData } from "../context/DataContext";
import { usePageMeta } from "../hooks/usePageMeta";

const SERVICES = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    desc: "Reliable, fast browsing for forms, research, and downloads — no buffering, no waiting.",
    badge: "Most Used",
  },
  {
    icon: Printer,
    title: "Printing & Scanning",
    desc: "Print admit cards, results, and certificates instantly. Scan documents in high quality.",
    badge: "Quick Service",
  },
  {
    icon: FileEdit,
    title: "Online Form Filling",
    desc: "Expert-assisted filling for government job applications, scheme forms, and exam registrations.",
    badge: "Govt Jobs",
  },
  {
    icon: CreditCard,
    title: "PAN / Aadhaar Services",
    desc: "New applications, corrections, and updates for PAN Card and Aadhaar — done right, every time.",
    badge: "Documentation",
  },
  {
    icon: Wallet,
    title: "Digital Payments",
    desc: "Pay exam fees, scheme charges, and bills securely via UPI, cards, or net banking.",
    badge: "Secure",
  },
  {
    icon: FileBadge,
    title: "Resume Building",
    desc: "Professional resume and biodata creation tailored for govt and private job applications.",
    badge: "Career",
  },
];

const FEATURES = [
  {
    icon: Bell,
    title: "Daily Job Updates",
    desc: "Latest govt jobs, admit cards, results and answer keys — updated every day.",
  },
  {
    icon: Monitor,
    title: "Cyber Cafe Services",
    desc: "Browsing, printing, scanning and form-filling assistance, right here.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Links",
    desc: "Every apply link points to the official notification — no third-party redirects.",
  },
  {
    icon: Users,
    title: "Trusted Locally",
    desc: "Helping students and job seekers in Khanagaon and around for years.",
  },
];

export default function About() {
  const { data } = useSiteData();
  usePageMeta(
    "About",
    "How CyberCafe helps job seekers with daily updates, verified links and in-person cyber cafe services.",
  );

  return (
    <section className='max-w-5xl mx-auto px-6 py-16'>
      <div className='max-w-2xl'>
        <span className='inline-block text-xs font-medium px-3 py-1 rounded-full bg-tagbg text-tagtext'>
          About us
        </span>
        <h1 className='mt-4 font-display font-extrabold text-3xl sm:text-4xl text-ink'>
          Everything a job seeker needs, in one place
        </h1>
        <p className='mt-4 text-muted leading-relaxed'>
          {data.cafe?.name || "CyberCafe"} tracks government job openings, admit
          cards, results and answer keys across central and state exams, so you
          don't have to check ten different websites. Visit us in person for
          printing, form-filling help, and browsing.
        </p>
      </div>

      <div className='mt-14'>
        <p className='font-display font-bold text-xl text-ink'>Our Services</p>
        <p className='text-sm text-muted mt-1'>
          Everything you need under one roof.
        </p>

        <div className='mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className='relative rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/[0.03] hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-200'
            >
              <div className='flex items-start justify-between'>
                <span className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-white'>
                  <s.icon size={22} />
                </span>
                <span className='text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-tagbg text-tagtext'>
                  {s.badge}
                </span>
              </div>
              <p className='mt-4 font-display font-bold text-ink'>{s.title}</p>
              <p className='mt-1.5 text-sm text-muted leading-relaxed'>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-14'>
        <p className='font-display font-bold text-xl text-ink'>Why CyberCafe</p>
        <div className='mt-6 grid sm:grid-cols-2 gap-5'>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className='rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors'
            >
              <span className='inline-flex items-center justify-center w-11 h-11 rounded-xl bg-tagbg text-accent'>
                <f.icon size={20} />
              </span>
              <p className='mt-4 font-display font-bold text-ink'>{f.title}</p>
              <p className='mt-1.5 text-sm text-muted leading-relaxed'>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-14 rounded-2xl border border-border bg-surface2 p-8 text-center'>
        <p className='font-display font-bold text-xl text-ink'>
          Have a job listing to suggest?
        </p>
        <p className='mt-2 text-sm text-muted'>
          Message us on WhatsApp and we'll add it for everyone to see.
        </p>
        <a
          href={`https://wa.me/${data.cafe?.whatsapp}`}
          target='_blank'
          rel='noreferrer'
          className='inline-block mt-5 px-6 py-3 rounded-lg font-semibold text-sm bg-accent text-white hover:opacity-90 transition-opacity'
        >
          Message on WhatsApp
        </a>
      </div>
    </section>
  );
}
