import { useState, useEffect, useMemo } from "react";
import { Plus, Save, Loader2, Check, Search } from "lucide-react";
import { useSiteData } from "../../context/DataContext";
import ServiceEditor from "../../components/admin/ServiceEditor";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

export default function ManageServices() {
  const { data, save, status } = useSiteData();
  const [items, setItems] = useState(data.services || []);
  const [expandedId, setExpandedId] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => setItems(data.services || []), [data.services]);

  function updateService(id, updated) {
    setItems(items.map((s) => (s.id === id ? updated : s)));
  }

  function addService() {
    const id = `svc-${Date.now()}`;
    const newService = {
      id,
      name: "New Service",
      description: "",
      icon: "FileText",
      sub_links: [],
    };
    setItems([...items, newService]);
    setExpandedId(id);
  }

  async function handleSave() {
    const result = await save({ ...data, services: items });
    if (result?.ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <div>
      <div className='flex items-start justify-between gap-4 flex-wrap'>
        <div>
          <h1 className='font-display font-extrabold text-2xl text-ink'>
            Services
          </h1>
          <p className='text-muted text-sm mt-1'>
            Government service links shown on the public Services page (
            {items.length} total).
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className='shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-accent2 text-white hover:opacity-90 disabled:opacity-50 transition-opacity'
        >
          {status === "saving" ?
            <Loader2 className='animate-spin' size={16} />
          : savedFlash ?
            <Check size={16} />
          : <Save size={16} />}
          {status === "saving" ?
            "Saving…"
          : savedFlash ?
            "Saved"
          : "Save changes"}
        </button>
      </div>

      <div className='relative mt-6 max-w-md'>
        <Search
          size={16}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-muted'
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search services…'
          className='w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none'
        />
      </div>

      <div className='mt-5 space-y-3'>
        {filtered.map((service) => (
          <ServiceEditor
            key={service.id}
            service={service}
            expanded={expandedId === service.id}
            onToggle={() =>
              setExpandedId(expandedId === service.id ? null : service.id)
            }
            onChange={(updated) => updateService(service.id, updated)}
            onRemove={() => setPendingDelete(service)}
          />
        ))}
        {filtered.length === 0 && (
          <p className='text-center text-muted py-16 text-sm'>
            No services match your search.
          </p>
        )}
      </div>

      <button
        onClick={addService}
        className='mt-4 w-full border-2 border-dashed border-border rounded-2xl py-5 flex items-center justify-center gap-2 text-muted hover:text-accent hover:border-accent/50 font-medium text-sm transition-colors'
      >
        <Plus size={16} /> Add service
      </button>

      <ConfirmDialog
        open={!!pendingDelete}
        title='Delete this service?'
        message={`"${pendingDelete?.name}" will be permanently removed once you save changes.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          setItems(items.filter((s) => s.id !== pendingDelete.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
