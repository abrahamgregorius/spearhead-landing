"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import { LazyMotion, domAnimation } from "motion/react";

/* ------------------------------------------------------------------ */
/* Theme system — §10. Dark is the default; light is applied via the   */
/* `light` class on <html>, set before paint by the inline init script */
/* in app/layout.tsx. The DOM class + localStorage act as the external */
/* store, read through useSyncExternalStore (no state-in-effect).      */
/* ------------------------------------------------------------------ */

type Theme = "dark" | "light";

const themeListeners = new Set<() => void>();

const themeStore = {
  subscribe(callback: () => void) {
    themeListeners.add(callback);
    return () => {
      themeListeners.delete(callback);
    };
  },
  read(): Theme {
    try {
      return document.documentElement.classList.contains("light")
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  },
  write(theme: Theme) {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("spearhead-theme", theme);
    } catch {
      /* storage unavailable — ignore */
    }
    themeListeners.forEach((listener) => listener());
  },
};

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.read,
    () => "dark" as Theme,
  );

  const toggle = useCallback(() => {
    themeStore.write(themeStore.read() === "dark" ? "light" : "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Attribution — §8.3. Tracks the most recently explored use case and  */
/* where the visitor initiated signup from. Values map to the allowed  */
/* attribution set: performance_analytics | ai_strategy |              */
/* campaign_execution | hero | general.                                */
/* ------------------------------------------------------------------ */

export type AttributionSource =
  | "performance_analytics"
  | "ai_strategy"
  | "campaign_execution"
  | "hero"
  | "general";

const AttributionContext = createContext<{
  useCaseSource: AttributionSource;
  signupSource: AttributionSource;
  exploreUseCase: (source: AttributionSource) => void;
  markSignupIntent: (source: AttributionSource) => void;
}>({
  useCaseSource: "general",
  signupSource: "general",
  exploreUseCase: () => {},
  markSignupIntent: () => {},
});

export function useAttribution() {
  return useContext(AttributionContext);
}

function AttributionProvider({ children }: { children: React.ReactNode }) {
  const [useCaseSource, setUseCaseSource] =
    useState<AttributionSource>("general");
  const [signupSource, setSignupSource] =
    useState<AttributionSource>("general");

  const exploreUseCase = useCallback((source: AttributionSource) => {
    setUseCaseSource(source);
  }, []);

  const markSignupIntent = useCallback((source: AttributionSource) => {
    setSignupSource(source);
  }, []);

  return (
    <AttributionContext.Provider
      value={{ useCaseSource, signupSource, exploreUseCase, markSignupIntent }}
    >
      {children}
    </AttributionContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Motion — LazyMotion keeps the animation bundle small (§12).         */
/* All animated components must use `m.*`, never `motion.*`.           */
/* ------------------------------------------------------------------ */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <ThemeProvider>
        <AttributionProvider>{children}</AttributionProvider>
      </ThemeProvider>
    </LazyMotion>
  );
}
