import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, Check, ChevronUp, ChevronDown } from "lucide-react";
import { useSiteData } from "../../context/DataContext";
import { CATEGORY_ICONS, getCategoryIcon } from "../../lib/icons";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

const ICON_OPTIONS = Object.keys(CATEGORY_ICONS);

export default function ManageCategories() {
  const { data, save, status } = useSiteData();
  const [items, setItems] = useState(data.categories);
  const [savedFlash, setSavedFlash] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => setItems(data.categories), [data.categories]);

  function update(id, key, value) {
    setItems(items.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  }

  function move(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const next = [...items];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setItems(next);
  }

  function add() {
    setItems([...items, { id: `category-${Date.now()}`, label: "New Section", icon: "briefcase" }]);
  }

  async function handleSave() {
    const result = await save({ ...data, categories: items });
    if (result?.ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    }
  }

  const jobCount = (catId) => data.jobs.filter((j) => j.categories.includes(catId)).length;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-ink">Sections</h1>
          <p className="text-muted text-sm mt-1">
            These become the cards on your home page, in this order. Use the arrows to reorder,
            or delete one — its jobs stay, they just stop appearing under it.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-accent2 text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {status === "saving" ? <Loader2 className="animate-spin" size={16} /> : savedFlash ? <Check size={16} /> : <Save size={16} />}
          {status === "saving" ? "Saving…" : savedFlash ? "Saved" : "Save changes"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        {items.map((cat, index) => {
          const Icon = getCategoryIcon(cat.icon);
          return (
            <div key={cat.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-tagbg text-accent">
                  <Icon size={20} />
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="text-muted hover:text-accent disabled:opacity-25 disabled:hover:text-muted transition-colors"
                    aria-label="Move up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="text-muted hover:text-accent disabled:opacity-25 disabled:hover:text-muted transition-colors"
                    aria-label="Move down"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    onClick={() => setPendingDelete(cat)}
                    className="text-muted hover:text-red-500 transition-colors ml-1"
                    aria-label="Remove section"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <input
                value={cat.label}
                onChange={(e) => update(cat.id, "label", e.target.value)}
                placeholder="Section name"
                className="mt-4 w-full bg-transparent font-display font-bold text-lg text-ink focus:outline-none border-b border-transparent focus:border-accent pb-1"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-muted">
                  {jobCount(cat.id)} job{jobCount(cat.id) !== 1 ? "s" : ""}
                </p>
                <select
                  value={cat.icon}
                  onChange={(e) => update(cat.id, "icon", e.target.value)}
                  className="text-xs bg-surface2 border border-border rounded-md px-2 py-1 text-muted focus:border-accent focus:outline-none"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}

        <button
          onClick={add}
          className="rounded-2xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center gap-2 text-muted hover:text-accent hover:border-accent/50 transition-colors min-h-[140px]"
        >
          <Plus size={22} />
          <span className="text-sm font-medium">Add section</span>
        </button>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Remove this section?"
        message={`"${pendingDelete?.label}" will be removed from the home page. ${jobCount(pendingDelete?.id)} job(s) using it will no longer be listed under it.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          setItems(items.filter((c) => c.id !== pendingDelete.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}