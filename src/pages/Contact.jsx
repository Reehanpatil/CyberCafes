import { Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "../components/icons/SocialIcons";
import { useSiteData } from "../context/DataContext";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  const { data } = useSiteData();
  const cafe = data.cafe || {};

  usePageMeta(
    "Contact",
    `Visit or message ${cafe.name || "CyberCafe"} — address, phone and WhatsApp details.`,
  );

  return (
    <section className='max-w-5xl mx-auto px-6 py-16'>
      <div className='max-w-xl'>
        <span className='inline-block text-xs font-medium px-3 py-1 rounded-full bg-tagbg text-tagtext'>
          Get in touch
        </span>
        <h1 className='mt-4 font-display font-extrabold text-3xl sm:text-4xl text-ink'>
          Visit or message us
        </h1>
        <p className='mt-4 text-muted leading-relaxed'>
          Drop by for printing, browsing and form help, or reach out on WhatsApp
          with any questions or job listings you'd like added.
        </p>
      </div>

      <div className='mt-10 grid sm:grid-cols-2 gap-6 items-start'>
        <div className='space-y-4'>
          <div className='rounded-2xl border border-border bg-surface p-5 flex items-start gap-4'>
            <span className='inline-flex items-center justify-center w-11 h-11 rounded-xl bg-tagbg text-accent shrink-0'>
              <MapPin size={20} />
            </span>
            <div>
              <p className='font-semibold text-ink'>Address</p>
              <p className='text-sm text-muted mt-0.5'>{cafe.address}</p>
            </div>
          </div>

          <div className='rounded-2xl border border-border bg-surface p-5 flex items-start gap-4'>
            <span className='inline-flex items-center justify-center w-11 h-11 rounded-xl bg-tagbg text-accent shrink-0'>
              <Phone size={20} />
            </span>
            <div>
              <p className='font-semibold text-ink'>Phone</p>
              <p className='text-sm text-muted mt-0.5'>{cafe.phone}</p>
            </div>
          </div>

          <div className='rounded-2xl border border-border bg-surface p-5 flex items-start gap-4'>
            <span className='inline-flex items-center justify-center w-11 h-11 rounded-xl bg-tagbg text-accent shrink-0'>
              <Clock size={20} />
            </span>
            <div>
              <p className='font-semibold text-ink'>Open</p>
              <p className='text-sm text-muted mt-0.5'>
                Mon – Sun · 8:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${cafe.whatsapp}`}
            target='_blank'
            rel='noreferrer'
            className='flex items-center justify-center gap-2 rounded-2xl bg-accent text-white py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity'
          >
            <WhatsAppIcon size={18} /> Chat on WhatsApp
          </a>
        </div>

        <div className='rounded-2xl overflow-hidden border border-border aspect-square sm:aspect-auto sm:h-full min-h-[280px]'>
          <iframe
            title='cafe-location'
            className='w-full h-full grayscale contrast-125 opacity-90'
            src='https://maps.google.com/maps?q=Khanagaon%2C+Belagavi&output=embed'
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
}
