import * as React from 'react';
import { cx, styleVars } from '../cx';
import type { LcarsColor } from '../types';

type Div = React.HTMLAttributes<HTMLDivElement>;

// ---- Comms panel ------------------------------------------------------------
export interface LcarsCommsProps extends Omit<Div, 'title'> {
  title?: React.ReactNode;
  freq?: React.ReactNode;
}
export function LcarsComms({ title, freq, className, children, ...rest }: LcarsCommsProps) {
  return (
    <div className={cx('lcars-comms', className)} {...rest}>
      {(title != null || freq != null) && (
        <div className="lcars-comms__header">
          {title != null && <span className="lcars-comms__title">{title}</span>}
          {freq != null && <span className="lcars-comms__freq">{freq}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export interface LcarsCommsChannelProps extends Div {
  name: React.ReactNode;
  signal: number;
  active?: boolean;
}
export function LcarsCommsChannel({ name, signal, active, className, ...rest }: LcarsCommsChannelProps) {
  return (
    <div className={cx('lcars-comms__channel', active && 'is-active', className)} {...rest}>
      <span className="lcars-indicator__light" />
      <span className="lcars-comms__name">{name}</span>
      <div className="lcars-comms__signal" style={styleVars(undefined, { '--signal': signal })}>
        <div className="lcars-comms__signal-fill" />
      </div>
    </div>
  );
}

// ---- Waveform ---------------------------------------------------------------
export interface LcarsWaveformProps extends Div {
  values: number[];
  color?: LcarsColor;
  live?: boolean;
}
export function LcarsWaveform({ values, color = 'accent', live, className, ...rest }: LcarsWaveformProps) {
  return (
    <div
      className={cx('lcars-waveform', `lcars-waveform--${color}`, live && 'lcars-waveform--live', className)}
      {...rest}
    >
      {values.map((v, i) => (
        <span key={i} className="lcars-waveform__bar" style={styleVars(undefined, { '--value': v })} />
      ))}
    </div>
  );
}

// ---- Hail -------------------------------------------------------------------
export interface LcarsHailProps extends Omit<Div, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  variant?: 'incoming' | 'secure' | 'priority';
  actions?: React.ReactNode;
}
export function LcarsHail({ title, subtitle, variant = 'incoming', actions, className, children, ...rest }: LcarsHailProps) {
  return (
    <div className={cx('lcars-hail', `lcars-hail--${variant}`, className)} {...rest}>
      <span className="lcars-hail__icon" />
      <div className="lcars-hail__body">
        {title != null && <span className="lcars-hail__title">{title}</span>}
        {subtitle != null && <span className="lcars-hail__subtitle">{subtitle}</span>}
      </div>
      {(actions ?? children) != null && <div className="lcars-hail__actions">{actions ?? children}</div>}
    </div>
  );
}
