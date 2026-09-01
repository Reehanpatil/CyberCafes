export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-mono text-sm font-bold px-5 py-3 rounded-md transition-all duration-150 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-amber-500 text-ink-950 hover:bg-amber-400 active:translate-y-px shadow-[0_4px_0_0_#D98B0F] hover:shadow-[0_2px_0_0_#D98B0F] active:shadow-none",
    ghost:
      "bg-transparent text-paper-100 border border-ink-600 hover:border-amber-500 hover:text-amber-400",
    signal:
      "bg-signal-500 text-ink-950 hover:bg-signal-400 active:translate-y-px shadow-[0_4px_0_0_#14B8A6] hover:shadow-[0_2px_0_0_#14B8A6] active:shadow-none",
    danger:
      "bg-transparent text-alert-500 border border-alert-500/40 hover:bg-alert-500/10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
