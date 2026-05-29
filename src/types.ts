// Shared types for the React wrappers.

/** Semantic colour roles (and named stops) every `--<role>` modifier accepts. */
export type LcarsColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'muted'
  | 'danger'
  | 'warning'
  | 'success'
  | 'golden-tanoi'
  | 'periwinkle'
  | 'lilac'
  | 'hopbush'
  | 'pale-canary'
  | 'butterscotch'
  | 'tomato'
  | 'sunflower';

/** Federation eras + faction skins (applied as `.lcars-theme-*`). */
export type LcarsTheme =
  | 'tng'
  | 'picard'
  | 'ds9'
  | 'voyager'
  | 'klingon'
  | 'romulan'
  | 'cardassian'
  | 'ferengi';

/** Status used by indicators / overview regions / MSD sections. */
export type LcarsStatus = 'nominal' | 'warning' | 'critical' | 'offline';

/** Allow CSS custom properties in inline style objects. */
export type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;
