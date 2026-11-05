"use client";

import { useSyncExternalStore } from "react";

/* Copyright year generated dynamically (§9). Rendered from a client
   snapshot so the prerendered page never embeds an unstable timestamp. */

const emptySubscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => null;

export function DynamicYear() {
  const year = useSyncExternalStore(emptySubscribe, getYear, getServerYear);
  return <span suppressHydrationWarning>{year ?? ""}</span>;
}
