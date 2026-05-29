// Ambient types for the core runtime (authored in plain JS, so no shipped .d.ts).
declare module '@openfantasymap/lcars-core/js' {
  export interface LcarsStore {
    get(key?: string): any;
    set(key: string | Record<string, any>, value?: any): string[];
    update(key: string, fn: (value: any, state: Record<string, any>) => any): string[];
    subscribe(fn: (changedKeys: string[], state: Record<string, any>) => void): () => void;
    readonly state: Record<string, any>;
  }

  export function createStore(initial?: Record<string, any>): LcarsStore;
  export function bind(root: Element, store: LcarsStore): () => void;
  export function simulate(
    store: LcarsStore,
    spec: Record<string, [number, number] | { min?: number; max?: number; step?: number; wrap?: boolean }>,
    intervalMs?: number
  ): () => void;
  export const formatters: Record<string, (value: any) => any>;
  export function format(value: any, name?: string): any;

  export interface OverviewApi {
    host: Element;
    stage: Element;
    svg: SVGElement | null;
    regions: Map<string, Element>;
    defaults: Record<string, string>;
    seed: Record<string, string>;
    connect(store?: LcarsStore): LcarsStore;
    store?: LcarsStore;
    statuses(): Record<string, string | null>;
    setStatus(id: string, status: string): void;
    setText(id: string, text: string): void;
    select(id: string): void;
    bind(store: LcarsStore): () => void;
  }
  export function loadOverview(
    host: Element,
    source: string | SVGElement,
    opts?: { onSelect?: (id: string, el: Element) => void; legend?: boolean }
  ): Promise<OverviewApi>;
}
