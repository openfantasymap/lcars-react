import * as React from 'react';
import { cx, styleVars } from '../cx';
import type { LcarsColor } from '../types';

type Div = React.HTMLAttributes<HTMLDivElement>;

// ---- Gauge ------------------------------------------------------------------
export interface LcarsGaugeProps extends Div {
  value: number;
  color?: LcarsColor;
  size?: 'sm' | 'default' | 'lg';
  label?: React.ReactNode;
  unit?: React.ReactNode;
}
export function LcarsGauge({
  value,
  color = 'primary',
  size = 'default',
  label,
  unit = '%',
  className,
  style,
  children,
  ...rest
}: LcarsGaugeProps) {
  return (
    <div
      className={cx('lcars-gauge', `lcars-gauge--${color}`, size !== 'default' && `lcars-gauge--${size}`, className)}
      style={styleVars(style, { '--value': value })}
      {...rest}
    >
      <span className="lcars-gauge__value">
        {Math.round(value)}
        {unit != null && <small>{unit}</small>}
      </span>
      {label != null && <span className="lcars-gauge__label">{label}</span>}
      {children}
    </div>
  );
}

// ---- Bar graph --------------------------------------------------------------
export interface LcarsBarGraphProps extends Div {
  /** per-bar values (0–100) */
  values: number[];
  mono?: boolean;
  live?: boolean;
}
export function LcarsBarGraph({ values, mono, live, className, children, ...rest }: LcarsBarGraphProps) {
  return (
    <div
      className={cx('lcars-bargraph', mono && 'lcars-bargraph--mono', live && 'lcars-bargraph--live', className)}
      {...rest}
    >
      {values.map((v, i) => (
        <div key={i} className="lcars-bargraph__bar" style={styleVars(undefined, { '--value': v })} />
      ))}
      {children}
    </div>
  );
}

// ---- Data cascade -----------------------------------------------------------
export interface LcarsDataCascadeProps extends Div {
  /** lines; repeated twice for a seamless loop */
  lines: Array<{ text: React.ReactNode; tone?: 'ok' | 'alert' }>;
  fast?: boolean;
  paused?: boolean;
}
export function LcarsDataCascade({ lines, fast, paused, className, ...rest }: LcarsDataCascadeProps) {
  const set = [...lines, ...lines];
  return (
    <div
      className={cx('lcars-cascade', fast && 'lcars-cascade--fast', paused && 'lcars-cascade--paused', className)}
      {...rest}
    >
      <div className="lcars-cascade__stream">
        {set.map((l, i) => (
          <span
            key={i}
            className={cx('lcars-cascade__line', l.tone === 'alert' && 'is-alert', l.tone === 'ok' && 'is-ok')}
          >
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---- Warp core --------------------------------------------------------------
export interface LcarsWarpCoreProps extends Div {
  state?: 'running' | 'offline' | 'critical';
  orientation?: 'vertical' | 'horizontal';
  /** pulse period, seconds */
  rate?: number;
}
export function LcarsWarpCore({
  state = 'running',
  orientation = 'vertical',
  rate,
  className,
  style,
  ...rest
}: LcarsWarpCoreProps) {
  return (
    <div
      className={cx(
        'lcars-warpcore',
        state === 'offline' && 'lcars-warpcore--offline',
        state === 'critical' && 'lcars-warpcore--critical',
        orientation === 'horizontal' && 'lcars-warpcore--horizontal',
        className
      )}
      style={styleVars(style, { '--rate': rate != null ? `${rate}s` : undefined })}
      {...rest}
    >
      <div className="lcars-warpcore__plasma" />
      <div className="lcars-warpcore__core" />
    </div>
  );
}

// ---- Alert ------------------------------------------------------------------
export interface LcarsAlertProps extends Div {
  condition?: 'red' | 'yellow' | 'blue' | 'green';
  flash?: boolean;
  solid?: boolean;
  text?: React.ReactNode;
}
export function LcarsAlert({
  condition = 'red',
  flash,
  solid,
  text,
  className,
  children,
  ...rest
}: LcarsAlertProps) {
  return (
    <div
      className={cx(
        'lcars-alert',
        `lcars-alert--${condition}`,
        flash && 'lcars-alert--flash',
        solid && 'lcars-alert--solid',
        className
      )}
      {...rest}
    >
      <span className="lcars-alert__cap" />
      <span className="lcars-alert__text">{text ?? children}</span>
      <span className="lcars-alert__cap" />
    </div>
  );
}
