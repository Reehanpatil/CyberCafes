import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label='Toggle dark mode'
      className='w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:border-accent transition-colors'
    >
      {theme === "dark" ?
        <Sun size={17} />
      : <Moon size={17} />}
    </button>
  );
}
