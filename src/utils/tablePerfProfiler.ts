import { useEffect, useRef } from "react";
import type { ProfilerOnRenderCallback } from "react";

type TableRenderEvent = {
  id: string;
  render: number;
  changedProps: string[];
  timestampMs: number;
};

type TableCommitEvent = {
  id: string;
  phase: "mount" | "update" | "nested-update";
  actualDurationMs: number;
  baseDurationMs: number;
  startTimeMs: number;
  commitTimeMs: number;
};

type TablePerfStore = {
  renderEvents: TableRenderEvent[];
  commitEvents: TableCommitEvent[];
};

declare global {
  interface Window {
    __ATA_TABLE_PERF__?: TablePerfStore;
  }
}

const isBrowser = typeof window !== "undefined";
const isEnabled = import.meta.env.DEV && isBrowser;

const getStore = (): TablePerfStore | null => {
  if (!isEnabled) return null;
  if (!window.__ATA_TABLE_PERF__) {
    window.__ATA_TABLE_PERF__ = {
      renderEvents: [],
      commitEvents: [],
    };
  }
  return window.__ATA_TABLE_PERF__;
};

const summarizeProp = (value: unknown): string => {
  if (Array.isArray(value)) return `array(${value.length})`;
  if (value && typeof value === "object") return "object";
  return String(value);
};

export const useTableRenderTracker = (
  id: string,
  trackedProps: Record<string, unknown>
) => {
  const previousPropsRef = useRef<Record<string, unknown> | null>(null);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  if (isEnabled) {
    const previousProps = previousPropsRef.current;
    const changedProps = Object.keys(trackedProps).filter((key) => {
      const prevValue = previousProps?.[key];
      const nextValue = trackedProps[key];
      if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
        return prevValue !== nextValue || prevValue.length !== nextValue.length;
      }
      return !Object.is(prevValue, nextValue);
    });

    const store = getStore();
    store?.renderEvents.push({
      id,
      render: renderCountRef.current,
      changedProps:
        renderCountRef.current === 1
          ? Object.keys(trackedProps).map(
              (key) => `${key}:${summarizeProp(trackedProps[key])}`
            )
          : changedProps,
      timestampMs: performance.now(),
    });
  }

  useEffect(() => {
    previousPropsRef.current = trackedProps;
  });
};

export const createTableProfilerCallback = (
  id: string
): ProfilerOnRenderCallback => {
  return (
    profilerId,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    const store = getStore();
    store?.commitEvents.push({
      id: profilerId || id,
      phase,
      actualDurationMs: Number(actualDuration.toFixed(2)),
      baseDurationMs: Number(baseDuration.toFixed(2)),
      startTimeMs: Number(startTime.toFixed(2)),
      commitTimeMs: Number(commitTime.toFixed(2)),
    });
  };
};
