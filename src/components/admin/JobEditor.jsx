import { Trash2, Plus, ChevronDown, X } from "lucide-react";
import { BUTTON_STYLE_OPTIONS, getButtonClass } from "../../lib/buttonStyles";
import { formatDate, formatSalary } from "../../lib/icons";

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className='block text-xs font-medium text-muted mb-1.5'>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none transition-colors";

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

  const expired = job.lastDate && new Date(job.lastDate) < new Date();

  return (
    <div
      className={`rounded-2xl border bg-surface overflow-hidden transition-colors ${expanded ? "border-accent/40" : "border-border"}`}
    >
      <button
        onClick={onToggle}
        className='w-full flex items-center gap-4 px-5 py-4 text-left'
      >
        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-ink truncate'>
            {job.title || "Untitled job"}
          </p>
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted'>
            <span>{job.location || "No location"}</span>
            <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
            {job.lastDate && (
              <span className={expired ? "text-red-500" : ""}>
                {expired ? "Expired " : "Due "}
                {formatDate(job.lastDate)}
              </span>
            )}
          </div>
          <div className='flex flex-wrap gap-1.5 mt-2'>
            {job.categories.map((catId) => {
              const cat = categories.find((c) => c.id === catId);
              return cat ?
                  <span
                    key={catId}
                    className='text-[11px] px-2 py-0.5 rounded-full bg-tagbg text-tagtext'
                  >
                    {cat.label}
                  </span>
                : null;
            })}
            {job.categories.length === 0 && (
              <span className='text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500'>
                No section assigned
              </span>
            )}
          </div>
        </div>
        <span className='text-xs text-muted shrink-0 hidden sm:block'>
          {job.buttons.length} button{job.buttons.length !== 1 ? "s" : ""}
        </span>
        <ChevronDown
          size={18}
          className={`text-muted shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className='px-5 pb-5 border-t border-border pt-5 space-y-6'>
          <div>
            <p className='text-xs font-semibold text-ink uppercase tracking-wide mb-3'>
              Details
            </p>
            <div className='grid sm:grid-cols-2 gap-3'>
              <Field label='Title' className='sm:col-span-2'>
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
              <Field label='Eligibility'>
                <input
                  className={inputClass}
                  value={job.eligibility}
                  onChange={(e) => set("eligibility", e.target.value)}
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
              <Field label='Age range'>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    className={inputClass}
                    value={job.ageMin}
                    onChange={(e) => set("ageMin", Number(e.target.value))}
                  />
                  <span className='text-muted text-sm'>to</span>
                  <input
                    type='number'
                    className={inputClass}
                    value={job.ageMax}
                    onChange={(e) => set("ageMax", Number(e.target.value))}
                  />
                </div>
              </Field>
              <Field label='Salary range (₹)' className='sm:col-span-2'>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    className={inputClass}
                    value={job.salaryMin}
                    onChange={(e) => set("salaryMin", Number(e.target.value))}
                  />
                  <span className='text-muted text-sm'>to</span>
                  <input
                    type='number'
                    className={inputClass}
                    value={job.salaryMax}
                    onChange={(e) => set("salaryMax", Number(e.target.value))}
                  />
                </div>
              </Field>
              <Field
                label='SEO description (optional — shown in Google search results)'
                className='sm:col-span-2'
              >
                <textarea
                  rows={2}
                  className={inputClass}
                  placeholder="Leave blank to auto-generate from the job's details"
                  value={job.metaDescription || ""}
                  onChange={(e) => set("metaDescription", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div>
            <p className='text-xs font-semibold text-ink uppercase tracking-wide mb-3'>
              Sections
            </p>
            <div className='flex flex-wrap gap-2'>
              {categories.map((cat) => {
                const active = job.categories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type='button'
                    onClick={() => toggleCategory(cat.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                      active ?
                        "bg-accent text-white border-accent"
                      : "border-border text-muted hover:text-ink hover:border-accent/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
              {categories.length === 0 && (
                <p className='text-xs text-muted'>
                  No sections yet — add one under Sections.
                </p>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-xs font-semibold text-ink uppercase tracking-wide'>
                Buttons
              </p>
              <button
                onClick={addButton}
                className='inline-flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80'
              >
                <Plus size={14} /> Add button
              </button>
            </div>
            <div className='space-y-2'>
              {job.buttons.map((btn) => (
                <div
                  key={btn.id}
                  className='rounded-xl border border-border bg-page p-3'
                >
                  <div className='grid sm:grid-cols-[1fr_1.4fr_auto_auto] gap-2 items-center'>
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
                      className='justify-self-end sm:justify-self-auto text-muted hover:text-red-500 transition-colors'
                      aria-label='Remove button'
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <span
                    className={`inline-block mt-2 text-xs px-2.5 py-1 rounded-md ${getButtonClass(btn.style)}`}
                  >
                    {btn.label || "Preview"}
                  </span>
                </div>
              ))}
              {job.buttons.length === 0 && (
                <p className='text-xs text-muted'>
                  No buttons — this job's detail page will show none.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onRemove}
            className='flex items-center gap-1.5 text-xs font-medium text-red-500 hover:underline'
          >
            <Trash2 size={13} /> Delete this job
          </button>
        </div>
      )}
    </div>
  );
}
