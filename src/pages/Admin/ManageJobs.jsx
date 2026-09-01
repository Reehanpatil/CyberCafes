import { useState, useEffect, useMemo } from "react";
import { Plus, Save, Loader2, Check, Search } from "lucide-react";
import { useSiteData } from "../../context/DataContext";
import JobEditor from "../../components/admin/JobEditor";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

export default function ManageJobs() {
  const { data, save, status } = useSiteData();
  const [items, setItems] = useState(data.jobs);
  const [expandedId, setExpandedId] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => setItems(data.jobs), [data.jobs]);

  function updateJob(id, updated) {
    setItems(items.map((j) => (j.id === id ? updated : j)));
  }

  function addJob() {
    const newJob = {
      id: `job-${Date.now()}`,
      title: "New Job",
      categories: [],
      location: "",
      startDate: "",
      lastDate: "",
      examDate: "",
      eligibility: "",
      ageMin: 18,
      ageMax: 30,
      salaryMin: 0,
      salaryMax: 0,
      metaDescription: "",
      buttons: [
        {
          id: `btn-${Date.now()}`,
          label: "Official Website",
          url: "https://",
          style: "dark",
        },
      ],
    };
    setItems([...items, newJob]);
    setExpandedId(newJob.id);
  }

  async function handleSave() {
    const result = await save({ ...data, jobs: items });
    if (result?.ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    }
  }

  const filtered = useMemo(() => {
    return items.filter((j) => {
      const matchesQuery =
        !query ||
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.location.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || j.categories.includes(categoryFilter);
      return matchesQuery && matchesCategory;
    });
  }, [items, query, categoryFilter]);

  return (
    <div>
      <div className='flex items-start justify-between gap-4 flex-wrap'>
        <div>
          <h1 className='font-display font-extrabold text-2xl text-ink'>
            Jobs
          </h1>
          <p className='text-muted text-sm mt-1'>
            Each job controls its own sections and its own buttons.
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

      <div className='flex flex-col sm:flex-row gap-3 mt-6'>
        <div className='relative flex-1'>
          <Search
            size={16}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-muted'
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search by title or location…'
            className='w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none'
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className='bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none'
        >
          <option value='all'>All sections</option>
          {data.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className='mt-5 space-y-3'>
        {filtered.map((job) => (
          <JobEditor
            key={job.id}
            job={job}
            categories={data.categories}
            expanded={expandedId === job.id}
            onToggle={() =>
              setExpandedId(expandedId === job.id ? null : job.id)
            }
            onChange={(updated) => updateJob(job.id, updated)}
            onRemove={() => setPendingDelete(job)}
          />
        ))}
        {filtered.length === 0 && (
          <p className='text-center text-muted py-16 text-sm'>
            No jobs match your search.
          </p>
        )}
      </div>

      <button
        onClick={addJob}
        className='mt-4 w-full border-2 border-dashed border-border rounded-2xl py-5 flex items-center justify-center gap-2 text-muted hover:text-accent hover:border-accent/50 font-medium text-sm transition-colors'
      >
        <Plus size={16} /> Add job
      </button>

      <ConfirmDialog
        open={!!pendingDelete}
        title='Delete this job?'
        message={`"${pendingDelete?.title}" will be permanently removed once you save changes.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          setItems(items.filter((j) => j.id !== pendingDelete.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
