import {
  Briefcase,
  FileText,
  CheckCircle2,
  KeyRound,
  Building2,
} from "lucide-react";

export const CATEGORY_ICONS = {
  briefcase: Briefcase,
  "file-text": FileText,
  "check-circle": CheckCircle2,
  key: KeyRound,
  building: Building2,
};

export function getCategoryIcon(iconName) {
  return CATEGORY_ICONS[iconName] || Briefcase;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatSalary(min, max) {
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return fmt(min);
  return "—";
}
