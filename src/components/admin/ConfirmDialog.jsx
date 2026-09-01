import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center px-4'>
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onCancel}
      />
      <div className='relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl'>
        <div className='flex items-center gap-3'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 text-red-500 shrink-0'>
            <AlertTriangle size={20} />
          </span>
          <p className='font-display font-bold text-ink'>{title}</p>
        </div>
        <p className='mt-3 text-sm text-muted'>{message}</p>
        <div className='mt-6 flex gap-3'>
          <button
            onClick={onCancel}
            className='flex-1 py-2.5 rounded-lg text-sm font-semibold border border-border text-ink hover:bg-surface2 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 py-2.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
