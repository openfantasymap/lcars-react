export type ClassValue = string | false | null | undefined;

/** Join truthy class names. */
export function cx(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ');
}

/** Merge a base style with CSS custom properties, dropping undefined values. */
export function styleVars(
  base: React.CSSProperties | undefined,
  map: Record<string, string | number | undefined>
): React.CSSProperties {
  const out: Record<string, any> = { ...(base || {}) };
  for (const k in map) {
    const v = map[k];
    if (v !== undefined && v !== null) out[k] = v;
  }
  return out as React.CSSProperties;
}

/** Coerce a number → "<n>rem"; pass strings through unchanged. */
export function len(v: string | number | undefined): string | undefined {
  if (v === undefined || v === null) return undefined;
  return typeof v === 'number' ? `${v}rem` : v;
}
