import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  createStore,
  bind,
  simulate,
  type LcarsStore,
} from '@openfantasymap/lcars-core/js';

export { createStore };
export type { LcarsStore };

/** Create (once) and memoise a store, or adopt an existing one. */
export function useLcarsStore(init?: Record<string, any> | LcarsStore): LcarsStore {
  const ref = useRef<LcarsStore>();
  if (!ref.current) {
    ref.current =
      init && typeof (init as LcarsStore).subscribe === 'function'
        ? (init as LcarsStore)
        : createStore((init as Record<string, any>) || {});
  }
  return ref.current;
}

/** Subscribe to a single key. Returns a primitive → safe with useSyncExternalStore. */
export function useLcarsValue<T = any>(store: LcarsStore, key: string): T {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => store.get(key) as T,
    () => store.get(key) as T
  );
}

function pick(state: Record<string, any>, keys: string[]) {
  const out: Record<string, any> = {};
  for (const k of keys) out[k] = state[k];
  return out;
}

/** Subscribe to several keys; re-renders only when one of them changes. */
export function useLcarsValues(store: LcarsStore, keys: string[]): Record<string, any> {
  const [snap, setSnap] = useState(() => pick(store.state, keys));
  const sig = keys.join(',');
  useEffect(() => {
    setSnap(pick(store.state, keys));
    return store.subscribe((changed) => {
      if (keys.some((k) => changed.includes(k))) setSnap(pick(store.state, keys));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, sig]);
  return snap;
}

/** Run the demo telemetry simulator for the lifetime of the component. */
export function useSimulate(
  store: LcarsStore,
  spec: Record<string, any>,
  intervalMs = 700
): void {
  useEffect(() => {
    const stop = simulate(store, spec, intervalMs);
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
}

/**
 * Bind the core data-binding runtime to a DOM subtree (e.g. when you author
 * raw `data-bind-*` markup or inline SVG inside a component). Returns a ref.
 */
export function useLcarsBind<T extends Element = HTMLDivElement>(store: LcarsStore) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) return bind(ref.current, store);
  }, [store]);
  return ref;
}
