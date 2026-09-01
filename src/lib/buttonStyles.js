export const BUTTON_STYLES = {
  primary: "bg-accent text-white hover:opacity-90",
  outline: "border border-accent text-accent hover:bg-tagbg",
  dark: "bg-ink text-page hover:opacity-90",
  success: "bg-accent2 text-white hover:opacity-90",
};

export const BUTTON_STYLE_OPTIONS = [
  { value: "primary", label: "Primary (blue)" },
  { value: "outline", label: "Outline" },
  { value: "dark", label: "Dark" },
  { value: "success", label: "Success (green)" },
];

export function getButtonClass(style) {
  return BUTTON_STYLES[style] || BUTTON_STYLES.primary;
}
