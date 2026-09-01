import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { BUTTON_STYLE_OPTIONS } from "../../lib/buttonStyles";

function Field({ label, children }) {
  return (
    <div>
      <label className='block font-mono text-xs text-paper-500 mb-1'>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-ink-900 border border-ink-600 rounded-md px-3 py-2 text-sm text-paper-100 focus:border-amber-500 focus:outline-none";

export default function JobEditor({
  job,
  categories,
  expanded,
  onToggle,
  onChange,
  onRemove,
}) {
  function set(key, value) {
    onChange({ ...job, [key]: value });
  }

  function toggleCategory(catId) {
    const has = job.categories.includes(catId);
    set(
      "categories",
      has ?
        job.categories.filter((c) => c !== catId)
      : [...job.categories, catId],
    );
  }

  function updateButton(id, key, value) {
    set(
      "buttons",
      job.buttons.map((b) => (b.id === id ? { ...b, [key]: value } : b)),
    );
  }

  function removeButton(id) {
    set(
      "buttons",
      job.buttons.filter((b) => b.id !== id),
    );
  }

  function addButton() {
    set("buttons", [
      ...job.buttons,
      {
        id: `btn-${Date.now()}`,
        label: "New Button",
        url: "https://",
        style: "primary",
      },
    ]);
  }

  return (
    <div className='rounded-xl border border-ink-600 bg-ink-800 overflow-hidden'>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between px-4 py-3 text-left'
      >
        <span className='font-mono text-sm font-bold text-paper-100'>
          {job.title || "Untitled job"}
        </span>
        {expanded ?
          <ChevronUp size={16} className='text-paper-500' />
        : <ChevronDown size={16} className='text-paper-500' />}
      </button>

      {expanded && (
        <div className='px-4 pb-4 space-y-4 border-t border-ink-700 pt-4'>
          <div className='grid sm:grid-cols-2 gap-3'>
            <Field label='Title'>
              <input
                className={inputClass}
                value={job.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>
            <Field label='Location'>
              <input
                className={inputClass}
                value={job.location}
                onChange={(e) => set("location", e.target.value)}
              />
            </Field>
            <Field label='Start date'>
              <input
                type='date'
                className={inputClass}
                value={job.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </Field>
            <Field label='Last date'>
              <input
                type='date'
                className={inputClass}
                value={job.lastDate}
                onChange={(e) => set("lastDate", e.target.value)}
              />
            </Field>
            <Field label='Exam date (free text)'>
              <input
                className={inputClass}
                value={job.examDate}
                onChange={(e) => set("examDate", e.target.value)}
              />
            </Field>
            <Field label='Eligibility'>
              <input
                className={inputClass}
                value={job.eligibility}
                onChange={(e) => set("eligibility", e.target.value)}
              />
            </Field>
            <Field label='Age min'>
              <input
                type='number'
                className={inputClass}
                value={job.ageMin}
                onChange={(e) => set("ageMin", Number(e.target.value))}
              />
            </Field>
            <Field label='Age max'>
              <input
                type='number'
                className={inputClass}
                value={job.ageMax}
                onChange={(e) => set("ageMax", Number(e.target.value))}
              />
            </Field>
            <Field label='Salary min (₹)'>
              <input
                type='number'
                className={inputClass}
                value={job.salaryMin}
                onChange={(e) => set("salaryMin", Number(e.target.value))}
              />
            </Field>
            <Field label='Salary max (₹)'>
              <input
                type='number'
                className={inputClass}
                value={job.salaryMax}
                onChange={(e) => set("salaryMax", Number(e.target.value))}
              />
            </Field>
          </div>

          <div>
            <p className='font-mono text-xs text-paper-500 mb-2'>
              Sections this job appears under
            </p>
            <div className='flex flex-wrap gap-2'>
              {categories.map((cat) => {
                const active = job.categories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type='button'
                    onClick={() => toggleCategory(cat.id)}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                      active ?
                        "bg-amber-500/10 border-amber-500 text-amber-400"
                      : "border-ink-600 text-paper-500 hover:text-paper-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className='font-mono text-xs text-paper-500 mb-2'>
              Buttons shown on this job's detail page
            </p>
            <div className='space-y-2'>
              {job.buttons.map((btn) => (
                <div
                  key={btn.id}
                  className='grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center'
                >
                  <input
                    className={inputClass}
                    placeholder='Label'
                    value={btn.label}
                    onChange={(e) =>
                      updateButton(btn.id, "label", e.target.value)
                    }
                  />
                  <input
                    className={inputClass}
                    placeholder='https://...'
                    value={btn.url}
                    onChange={(e) =>
                      updateButton(btn.id, "url", e.target.value)
                    }
                  />
                  <select
                    className={inputClass}
                    value={btn.style}
                    onChange={(e) =>
                      updateButton(btn.id, "style", e.target.value)
                    }
                  >
                    {BUTTON_STYLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeButton(btn.id)}
                    className='text-alert-500 hover:text-alert-500/70'
                    aria-label='Remove button'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addButton}
              className='mt-3 w-full border border-dashed border-ink-600 rounded-lg py-2.5 flex items-center justify-center gap-2 text-paper-500 hover:text-amber-400 hover:border-amber-500/50 font-mono text-xs transition-colors'
            >
              <Plus size={14} /> add button
            </button>
          </div>

          <button
            onClick={onRemove}
            className='flex items-center gap-1.5 text-xs font-mono text-alert-500 hover:underline'
          >
            <Trash2 size={13} /> delete this job
          </button>
        </div>
      )}
    </div>
  );
}
