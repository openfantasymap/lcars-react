import * as React from 'react';
import { cx, styleVars, len } from '../cx';
import type { LcarsColor } from '../types';

type Div = React.HTMLAttributes<HTMLDivElement>;
type Span = React.HTMLAttributes<HTMLSpanElement>;
const pad3 = (n: number) => String(Math.round(n)).padStart(3, '0');

// ---- Compass ----------------------------------------------------------------
export interface LcarsCompassProps extends Div {
  heading: number;
  mark?: number;
  color?: LcarsColor;
  size?: string | number;
}
export function LcarsCompass({ heading, mark, color, size, className, style, ...rest }: LcarsCompassProps) {
  return (
    <div
      className={cx('lcars-compass', color && `lcars-compass--${color}`, className)}
      style={styleVars(style, { '--heading': heading, '--compass-size': len(size) })}
      {...rest}
    >
      <span className="lcars-compass__cardinal lcars-compass__cardinal--n">N</span>
      <span className="lcars-compass__cardinal lcars-compass__cardinal--e">E</span>
      <span className="lcars-compass__cardinal lcars-compass__cardinal--s">S</span>
      <span className="lcars-compass__cardinal lcars-compass__cardinal--w">W</span>
      <div className="lcars-compass__needle" />
      <div className="lcars-compass__hub" />
      <div className="lcars-compass__readout">
        {pad3(heading)}
        {mark != null && <small>MARK {Math.round(mark)}</small>}
      </div>
    </div>
  );
}

// ---- Scanner ----------------------------------------------------------------
export interface LcarsScannerProps extends Div {
  /** sweep period, seconds */
  rate?: number;
  /** scope radius (number → rem) */
  scopeR?: string | number;
}
export function LcarsScanner({ rate, scopeR, className, style, children, ...rest }: LcarsScannerProps) {
  return (
    <div
      className={cx('lcars-scanner', className)}
      style={styleVars(style, { '--rate': rate != null ? `${rate}s` : undefined, '--scope-r': len(scopeR) })}
      {...rest}
    >
      <div className="lcars-scanner__grid" />
      <div className="lcars-scanner__sweep" />
      {children}
      <div className="lcars-scanner__hub" />
    </div>
  );
}

export interface LcarsScannerContactProps extends Span {
  range: number;
  bearing: number;
  kind?: 'default' | 'hostile' | 'neutral';
}
export function LcarsScannerContact({ range, bearing, kind = 'default', className, style, ...rest }: LcarsScannerContactProps) {
  return (
    <span
      className={cx('lcars-scanner__contact', kind !== 'default' && `lcars-scanner__contact--${kind}`, className)}
      style={styleVars(style, { '--range': range, '--bearing': bearing })}
      {...rest}
    />
  );
}

// ---- Stellar map ------------------------------------------------------------
export function LcarsStarmap({ className, children, ...rest }: Div) {
  return (
    <div className={cx('lcars-starmap', className)} {...rest}>
      {children}
    </div>
  );
}
export interface LcarsStarProps extends Span {
  x: number;
  y: number;
  variant?: 'giant' | 'dim';
}
export function LcarsStar({ x, y, variant, className, style, ...rest }: LcarsStarProps) {
  return (
    <span
      className={cx('lcars-starmap__star', variant && `lcars-starmap__star--${variant}`, className)}
      style={styleVars(style, { '--x': x, '--y': y })}
      {...rest}
    />
  );
}
export interface LcarsStarmapShipProps extends Span {
  x: number;
  y: number;
  rot?: number;
}
export function LcarsStarmapShip({ x, y, rot = 0, className, style, ...rest }: LcarsStarmapShipProps) {
  return (
    <span
      className={cx('lcars-starmap__ship', className)}
      style={styleVars(style, { '--x': x, '--y': y, '--rot': rot })}
      {...rest}
    />
  );
}
export interface LcarsStarmapWaypointProps extends Span {
  x: number;
  y: number;
}
export function LcarsStarmapWaypoint({ x, y, className, style, ...rest }: LcarsStarmapWaypointProps) {
  return (
    <span
      className={cx('lcars-starmap__waypoint', className)}
      style={styleVars(style, { '--x': x, '--y': y })}
      {...rest}
    />
  );
}
export interface LcarsStarmapCourseProps extends Div {
  x: number;
  y: number;
  length: string | number;
  angle: number;
}
export function LcarsStarmapCourse({ x, y, length, angle, className, style, ...rest }: LcarsStarmapCourseProps) {
  return (
    <div
      className={cx('lcars-starmap__course', className)}
      style={styleVars(style, { '--x': x, '--y': y, '--len': len(length), '--angle': angle })}
      {...rest}
    />
  );
}
export function LcarsStarmapLabel({ className, children, ...rest }: Span) {
  return (
    <span className={cx('lcars-starmap__label', className)} {...rest}>
      {children}
    </span>
  );
}

// ---- Helm console -----------------------------------------------------------
export interface LcarsHelmReadout {
  label: React.ReactNode;
  value: React.ReactNode;
  color?: LcarsColor;
}
export interface LcarsHelmProps extends Div {
  warp: number;
  impulse: number;
  throttle: number;
  readouts?: LcarsHelmReadout[];
}
export function LcarsHelm({ warp, impulse, throttle, readouts, className, style, children, ...rest }: LcarsHelmProps) {
  return (
    <div
      className={cx('lcars-helm', className)}
      style={styleVars(style, { '--warp': warp, '--impulse': impulse, '--throttle': throttle })}
      {...rest}
    >
      <div className="lcars-helm__head">
        <div className="lcars-helm__metric">
          <span className="lcars-helm__label">Warp</span>
          <span className="lcars-helm__value">{warp.toFixed(1)}</span>
        </div>
        <div className="lcars-helm__metric" style={{ alignItems: 'flex-end' }}>
          <span className="lcars-helm__label">Impulse</span>
          <span className="lcars-helm__value">{Math.round(impulse)}%</span>
        </div>
      </div>
      <div className="lcars-helm__bar lcars-helm__bar--warp" style={styleVars(undefined, { '--segments': 9 })}>
        <div className="lcars-helm__fill" />
      </div>
      <div className="lcars-helm__bar lcars-helm__bar--impulse" style={styleVars(undefined, { '--segments': 10 })}>
        <div className="lcars-helm__fill" />
      </div>
      <span className="lcars-helm__throttle-label">Throttle · {Math.round(throttle)}%</span>
      <div className="lcars-helm__bar lcars-helm__bar--throttle" style={styleVars(undefined, { '--segments': 20 })}>
        <div className="lcars-helm__fill" />
      </div>
      {readouts && readouts.length > 0 && (
        <div className="lcars-helm__readouts">
          {readouts.map((r, i) => (
            <div key={i} className={cx('lcars-readout', r.color && `lcars-readout--${r.color}`)}>
              <span className="lcars-readout__label">{r.label}</span>
              <span className="lcars-readout__value">{r.value}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
