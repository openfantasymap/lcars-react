import * as React from 'react';
import { cx, styleVars } from '../cx';
import type { LcarsStatus } from '../types';

type Div = React.HTMLAttributes<HTMLDivElement>;

// ---- EPS conduit ------------------------------------------------------------
export interface LcarsConduitProps extends Div {
  load: number;
  /** flow period, seconds */
  rate?: number;
  state?: 'normal' | 'critical' | 'offline';
  orientation?: 'horizontal' | 'vertical';
}
export function LcarsConduit({
  load,
  rate,
  state = 'normal',
  orientation = 'horizontal',
  className,
  style,
  ...rest
}: LcarsConduitProps) {
  return (
    <div
      className={cx(
        'lcars-conduit',
        state === 'critical' && 'lcars-conduit--critical',
        state === 'offline' && 'lcars-conduit--offline',
        orientation === 'vertical' && 'lcars-conduit--vertical',
        className
      )}
      style={styleVars(style, { '--load': load, '--rate': rate != null ? `${rate}s` : undefined })}
      {...rest}
    >
      <div className="lcars-conduit__plasma" />
    </div>
  );
}

// ---- Power distribution -----------------------------------------------------
export interface LcarsPowerProps extends Omit<Div, 'title'> {
  title?: React.ReactNode;
  total?: React.ReactNode;
}
export function LcarsPower({ title, total, className, children, ...rest }: LcarsPowerProps) {
  return (
    <div className={cx('lcars-power', className)} {...rest}>
      {(title != null || total != null) && (
        <div className="lcars-power__header">
          {title != null && <span className="lcars-power__title">{title}</span>}
          {total != null && <span className="lcars-power__total">{total}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export interface LcarsPowerRowProps extends Div {
  label: React.ReactNode;
  value: number;
  state?: 'nominal' | 'warning' | 'critical' | 'offline';
  display?: React.ReactNode;
}
export function LcarsPowerRow({ label, value, state = 'nominal', display, className, ...rest }: LcarsPowerRowProps) {
  return (
    <div className={cx('lcars-power__row', state !== 'nominal' && `is-${state}`, className)} {...rest}>
      <span className="lcars-power__label">{label}</span>
      <div className="lcars-power__bar" style={styleVars(undefined, { '--value': value })}>
        <div className="lcars-power__fill" />
      </div>
      <span className="lcars-power__value">{display ?? `${Math.round(value)}%`}</span>
    </div>
  );
}

// ---- Master Systems Display -------------------------------------------------
export interface LcarsMsdProps extends Div {
  saucer?: LcarsStatus;
  neck?: LcarsStatus;
  hull?: LcarsStatus;
  nacelleLeft?: LcarsStatus;
  nacelleRight?: LcarsStatus;
  name?: React.ReactNode;
}
export function LcarsMsd({
  saucer = 'nominal',
  neck,
  hull = 'nominal',
  nacelleLeft = 'nominal',
  nacelleRight = 'nominal',
  name,
  className,
  ...rest
}: LcarsMsdProps) {
  const neckStatus = neck ?? saucer;
  const sec = (extra: string, status: LcarsStatus) =>
    cx('lcars-msd__section', extra, `is-${status}`);
  return (
    <div className={cx('lcars-msd', className)} {...rest}>
      <div className={sec('lcars-msd__saucer', saucer)} />
      <div className={sec('lcars-msd__neck', neckStatus)} />
      <div className={sec('lcars-msd__hull', hull)} />
      <div className="lcars-msd__strut lcars-msd__strut--left" />
      <div className="lcars-msd__strut lcars-msd__strut--right" />
      <div className={sec('lcars-msd__nacelle lcars-msd__nacelle--left', nacelleLeft)} />
      <div className={sec('lcars-msd__nacelle lcars-msd__nacelle--right', nacelleRight)} />
      {name != null && <span className="lcars-msd__label">{name}</span>}
    </div>
  );
}
