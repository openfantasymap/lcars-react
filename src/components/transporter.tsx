import * as React from 'react';
import { cx, styleVars } from '../cx';

type Div = React.HTMLAttributes<HTMLDivElement>;

// ---- Pad platform -----------------------------------------------------------
export interface LcarsTransporterPadProps extends Div {
  pads?: number;
  energizing?: boolean;
  /** number of individually-lit pads (when not energizing) */
  active?: number;
  locked?: boolean;
}
export function LcarsTransporterPad({
  pads = 6,
  energizing,
  active = 0,
  locked,
  className,
  children,
  ...rest
}: LcarsTransporterPadProps) {
  return (
    <div
      className={cx('lcars-transporter-pad', energizing && 'lcars-transporter-pad--energizing', className)}
      {...rest}
    >
      {children ??
        Array.from({ length: pads }, (_, i) => (
          <div
            key={i}
            className={cx(
              'lcars-transporter-pad__pad',
              locked && 'is-locked',
              !energizing && i < active && 'is-active'
            )}
          />
        ))}
    </div>
  );
}

// ---- Materialisation chamber ------------------------------------------------
export interface LcarsTransporterProps extends Div {
  subject?: React.ReactNode;
  state?: 'materialized' | 'cycle' | 'energizing' | 'dematerializing' | 'materializing';
  /** 0–100; when set, uses the data-driven progress mode */
  progress?: number;
  /** seconds */
  rate?: number;
}
export function LcarsTransporter({
  subject,
  state = 'materialized',
  progress,
  rate,
  className,
  style,
  children,
  ...rest
}: LcarsTransporterProps) {
  const useProgress = progress != null;
  return (
    <div
      className={cx(
        'lcars-transporter',
        useProgress && 'lcars-transporter--progress',
        !useProgress && state === 'cycle' && 'lcars-transporter--cycle',
        !useProgress && state === 'energizing' && 'is-energizing',
        !useProgress && state === 'dematerializing' && 'is-dematerializing',
        !useProgress && state === 'materializing' && 'is-materializing',
        className
      )}
      style={styleVars(style, {
        '--rate': rate != null ? `${rate}s` : undefined,
        '--progress': useProgress ? progress : undefined,
      })}
      {...rest}
    >
      <div className="lcars-transporter__subject">{subject ?? children}</div>
      <div className="lcars-transporter__beam" />
    </div>
  );
}
