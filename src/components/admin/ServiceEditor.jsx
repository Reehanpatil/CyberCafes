import { Trash2, Plus, ChevronDown, X } from "lucide-react";
import { SERVICE_ICONS, getServiceIcon } from "../../lib/serviceIcons";

const inputClass =
  "w-full bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none transition-colors";

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

export default function ServiceEditor({
  service,
  expanded,
  onToggle,
  onChange,
  onRemove,
}) {
  function set(key, value) {
    onChange({ ...service, [key]: value });
  }

  function updateLink(i, key, value) {
    const links = [...service.sub_links];
    links[i] = { ...links[i], [key]: value };
    set("sub_links", links);
  }

  function removeLink(i) {
    set(
      "sub_links",
      service.sub_links.filter((_, idx) => idx !== i),
    );
  }

  function addLink() {
    set("sub_links", [
      ...service.sub_links,
      { label: "New Link", url: "https://", type: "official" },
    ]);
  }

  const Icon = getServiceIcon(service.icon);

  return (
    <div
      className={`rounded-2xl border bg-surface overflow-hidden transition-colors ${expanded ? "border-accent/40" : "border-border"}`}
    >
      <button
        onClick={onToggle}
        className='w-full flex items-center gap-4 px-5 py-4 text-left'
      >
        <span className='inline-flex items-center justify-center w-10 h-10 rounded-xl bg-tagbg text-accent shrink-0'>
          <Icon size={18} />
        </span>
        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-ink truncate'>
            {service.name || "Untitled service"}
          </p>
          <p className='text-xs text-muted mt-0.5'>
            {service.sub_links?.length || 0} link
            {service.sub_links?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`text-muted shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className='px-5 pb-5 border-t border-border pt-5 space-y-5'>
          <div className='grid sm:grid-cols-2 gap-3'>
            <Field label='Name' className='sm:col-span-2'>
              <input
                className={inputClass}
                value={service.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>
            <Field label='Description' className='sm:col-span-2'>
              <textarea
                rows={3}
                className={inputClass}
                value={service.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
            <Field label='Icon'>
              <select
                className={inputClass}
                value={service.icon}
                onChange={(e) => set("icon", e.target.value)}
              >
                {Object.keys(SERVICE_ICONS).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-xs font-semibold text-ink uppercase tracking-wide'>
                Links
              </p>
              <button
                onClick={addLink}
                className='inline-flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80'
              >
                <Plus size={14} /> Add link
              </button>
            </div>
            <div className='space-y-2'>
              {service.sub_links.map((link, i) => (
                <div
                  key={i}
                  className='rounded-xl border border-border bg-page p-3'
                >
                  <div className='grid sm:grid-cols-[1.2fr_1.6fr_auto_auto] gap-2 items-center'>
                    <input
                      className={inputClass}
                      placeholder='Label'
                      value={link.label}
                      onChange={(e) => updateLink(i, "label", e.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder='https://...'
                      value={link.url}
                      onChange={(e) => updateLink(i, "url", e.target.value)}
                    />
                    <select
                      className={inputClass}
                      value={link.type}
                      onChange={(e) => updateLink(i, "type", e.target.value)}
                    >
                      <option value='official'>Official</option>
                      <option value='pdf'>PDF</option>
                    </select>
                    <button
                      onClick={() => removeLink(i)}
                      className='text-muted hover:text-red-500 transition-colors'
                      aria-label='Remove link'
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {service.sub_links.length === 0 && (
                <p className='text-xs text-muted'>No links yet.</p>
              )}
            </div>
          </div>

          <button
            onClick={onRemove}
            className='flex items-center gap-1.5 text-xs font-medium text-red-500 hover:underline'
          >
            <Trash2 size={13} /> Delete this service
          </button>
        </div>
      )}
    </div>
  );
}
