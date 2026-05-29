'use client';
import * as React from 'react';
import { useEffect } from 'react';
import { cx } from '../cx';

export type LcarsDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

// Self-contained styles (mirrors the ngx component); injected once on the client.
const DPAD_CSS = `
.lcars-dpad{display:inline-block;width:var(--lcars-dpad-size,12rem);max-width:100%}
.lcars-dpad svg{width:100%;height:auto;display:block}
.lcars-dpad .seg{cursor:pointer}
.lcars-dpad .corner{fill:var(--lcars-primary,#ffcc66)}
.lcars-dpad .cardinal{fill:var(--lcars-secondary,#99ccff)}
.lcars-dpad .hub{fill:var(--lcars-tertiary,#cc99cc)}
.lcars-dpad .seg:active{fill:var(--lcars-accent,#cc6699)}
`;
let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-lcars-dpad', '');
  s.textContent = DPAD_CSS;
  document.head.appendChild(s);
}

/**
 * 8-way directional pad — an interactive LCARS control. Calls `onSelect` with
 * the chosen direction (N, NE, E, SE, S, SW, W, NW). Size via `--lcars-dpad-size`.
 *
 *   <LcarsDpad onSelect={(dir) => console.log(dir)} />
 */
export interface LcarsDpadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  onSelect?: (dir: LcarsDirection) => void;
}
export function LcarsDpad({ onSelect, className, ...rest }: LcarsDpadProps) {
  useEffect(ensureStyles, []);
  const pick = (d: LcarsDirection) => () => onSelect?.(d);
  return (
    <div className={cx('lcars-dpad', className)} {...rest}>
      <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path className="seg corner" onClick={pick('NE')} d="m47 33v-32.35c15.992 2.4474 29.977 16.417 32.424 32.35z" />
        <path className="seg corner" onClick={pick('SW')} d="m33 47v32.35c-15.992-2.4474-29.977-16.417-32.424-32.35z" />
        <path className="seg corner" onClick={pick('SE')} d="m47 47v32.35c15.992-2.4474 29.977-16.417 32.424-32.35z" />
        <path className="seg cardinal" onClick={pick('N')} d="m34 10h12v-9.5c-3.8785-0.47437-8.044-0.4824-12 0z" />
        <path className="seg cardinal" onClick={pick('W')} d="m10 46v-12h-9.5c-0.47437 3.8785-0.4824 8.044 0 12z" />
        <path className="seg cardinal" onClick={pick('E')} d="m70 34v12h9.5c0.47437-3.8785 0.4824-8.044 0-12z" />
        <path className="seg cardinal" onClick={pick('S')} d="m46 70h-12v9.5c3.8785 0.47437 8.044 0.4824 12 0z" />
        <path className="hub" d="m11 34v12h23v23h12v-23h23v-12h-23v-23h-12v23z" />
        <path className="seg corner" onClick={pick('NW')} d="m32.977 33v-32.35c-15.992 2.4474-29.977 16.417-32.424 32.35z" />
      </svg>
    </div>
  );
}
