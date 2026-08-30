"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const THEME_STORAGE_KEY = "kw-theme";

/* Runs before first paint, injected in <head>. Without this the
   page flashes dark before a stored light preference applies. */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

/* ============================================================
   The <html data-theme> attribute is the single source of truth -
   the blocking script sets it before React exists, and the canvas
   watches it too. So React subscribes to that attribute rather
   than keeping a competing copy in state; there is no window
   where the two can disagree.
   ============================================================ */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next: Theme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";

    /* Colour transitions are enabled only for the duration of the
       swap. Left on permanently they would fight every scroll
       animation with a 400ms colour tween. */
    root.classList.add("theme-transitioning");
    root.setAttribute("data-theme", next);
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 450);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage blocked - the theme still applies for this session */
    }
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
