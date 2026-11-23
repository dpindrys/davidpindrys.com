"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

/** Homepage work-grid demo ids in left-to-right / top-to-bottom order. */
export const WORK_DEMO_SWITCH_ORDER = ["vehr", "vinyl"] as const;

export type WorkDemoSwitchId = (typeof WORK_DEMO_SWITCH_ORDER)[number];

type DemoRegistration = {
  id: WorkDemoSwitchId;
  isOpen: () => boolean;
  openFromSwitch: () => void;
};

type WorkDemoSwitchContextValue = {
  register: (entry: DemoRegistration) => () => void;
  getAdjacentId: (
    fromId: WorkDemoSwitchId,
    delta: -1 | 1,
  ) => WorkDemoSwitchId | null;
  openDemo: (id: WorkDemoSwitchId) => void;
};

const WorkDemoSwitchContext = createContext<WorkDemoSwitchContextValue | null>(
  null,
);

export function WorkDemoSwitchProvider({ children }: { children: ReactNode }) {
  const entriesRef = useRef(new Map<WorkDemoSwitchId, DemoRegistration>());

  const register = useCallback((entry: DemoRegistration) => {
    entriesRef.current.set(entry.id, entry);
    return () => {
      entriesRef.current.delete(entry.id);
    };
  }, []);

  const orderedRegisteredIds = useCallback((): WorkDemoSwitchId[] => {
    return WORK_DEMO_SWITCH_ORDER.filter((id) => entriesRef.current.has(id));
  }, []);

  const getAdjacentId = useCallback(
    (fromId: WorkDemoSwitchId, delta: -1 | 1): WorkDemoSwitchId | null => {
      const ordered = orderedRegisteredIds();
      if (ordered.length < 2) return null;
      const index = ordered.indexOf(fromId);
      if (index < 0) return null;
      const nextIndex = (index + delta + ordered.length) % ordered.length;
      return ordered[nextIndex] ?? null;
    },
    [orderedRegisteredIds],
  );

  const openDemo = useCallback((id: WorkDemoSwitchId) => {
    entriesRef.current.get(id)?.openFromSwitch();
  }, []);

  const value = useMemo(
    () => ({ register, getAdjacentId, openDemo }),
    [getAdjacentId, openDemo, register],
  );

  return (
    <WorkDemoSwitchContext.Provider value={value}>
      {children}
    </WorkDemoSwitchContext.Provider>
  );
}

export function useWorkDemoSwitch() {
  return useContext(WorkDemoSwitchContext);
}