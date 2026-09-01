export function InstagramIcon({ size = 19, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <rect
        x='3'
        y='3'
        width='18'
        height='18'
        rx='5'
        stroke='currentColor'
        strokeWidth='1.8'
      />
      <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='1.8' />
      <circle cx='17.5' cy='6.5' r='1.2' fill='currentColor' />
    </svg>
  );
}

export function FacebookIcon({ size = 19, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6H13v-6h2.3l.7-3H13V9.6c0-.4.3-.6.7-.6H14z'
        fill='currentColor'
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 19, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinejoin='round'
      />
      <path
        d='M8.5 8.7c.2-.6.5-.6.8-.6h.6c.2 0 .4 0 .6.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5.4.7 1.4 1.7 2.1 2.1.2.1.3.1.5 0l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.2.3.4.3.6 0 .3-.4 1.2-1.2 1.5-.7.3-1.5.4-3-.2-1.9-.8-3.2-2.5-3.5-2.9-.3-.4-1.1-1.6-1.1-3 0-.6.2-1.1.4-1.5Z'
        fill='currentColor'
      />
    </svg>
  );
}
