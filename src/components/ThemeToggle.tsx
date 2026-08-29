import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/5" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
      className="relative p-2 rounded-xl border border-white/10 dark:border-white/10 light:border-black/10 bg-white/5 hover:bg-white/10 light:bg-black/5 light:hover:bg-black/10 transition-all duration-200 text-neutral-300 light:text-neutral-700 hover:text-white light:hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-blue-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
