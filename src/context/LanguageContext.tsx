"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale } from "@/data/types";

const STORAGE_KEY = "porto_lang";
const subscribers = new Set<() => void>();
let fallbackLocale: Locale = "id";

function subscribe(callback: () => void): () => void {
  subscribers.add(callback);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    subscribers.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "id" || saved === "en") {
      fallbackLocale = saved;
      return saved;
    }
    return fallbackLocale;
  } catch {
    return fallbackLocale;
  }
}

function getServerSnapshot(): Locale {
  return "id";
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.portoLang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    fallbackLocale = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors in restricted browsing contexts.
    }
    subscribers.forEach((notify) => notify());
  };

  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Returns current bilingual locale state (`id` | `en`) and setters. */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
