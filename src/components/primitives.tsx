import * as React from 'react';
import { cx, styleVars, len } from '../cx';
import type { LcarsColor } from '../types';

type Div = React.HTMLAttributes<HTMLDivElement>;

// ---- Elbow ------------------------------------------------------------------
export interface LcarsElbowProps extends Div {
  corner?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  color?: LcarsColor;
  /** trunk width (number → rem) */
  arm?: string | number;
  /** arm thickness (number → rem) */
  bar?: string | number;
  label?: React.ReactNode;
}
export function LcarsElbow({
  corner = 'left-bottom',
  color = 'primary',
  arm,
  bar,
  label,
  className,
  style,
  children,
  ...rest
}: LcarsElbowProps) {
  return (
    <div
      className={cx('lcars-elbow', corner, `lcars-elbow--${color}`, className)}
      style={styleVars(style, { '--lcars-elbow-arm': len(arm), '--lcars-elbow-bar': len(bar) })}
      {...rest}
    >
      {label != null && <span className="lcars-elbow__label">{label}</span>}
      {children}
    </div>
  );
}

// ---- Bar --------------------------------------------------------------------
export interface LcarsBarProps extends Omit<Div, 'title'> {
  color?: LcarsColor;
  cap?: 'left' | 'right' | 'both';
  fill?: boolean;
  decorated?: boolean;
  title?: React.ReactNode;
  titleSide?: 'left' | 'right';
}
export function LcarsBar({
  color = 'primary',
  cap,
  fill,
  decorated,
  title,
  titleSide = 'right',
  className,
  children,
  ...rest
}: LcarsBarProps) {
  return (
    <div
      className={cx(
        'lcars-bar',
        `lcars-bar--${color}`,
        fill && 'fill',
        cap && `cap-${cap}`,
        decorated && 'lcars-bar--decorated',
        className
      )}
      {...rest}
    >
      {title != null && (
        <span className={cx('lcars-bar__title', titleSide === 'left' && 'left')}>{title}</span>
      )}
      {children}
    </div>
  );
}

export interface LcarsBarGroupProps extends Div {
  thick?: boolean;
}
export function LcarsBarGroup({ thick, className, children, ...rest }: LcarsBarGroupProps) {
  return (
    <div className={cx('lcars-bar-group', thick && 'lcars-bar-group--thick', className)} {...rest}>
      {children}
    </div>
  );
}

export interface LcarsBarVerticalProps extends Div {
  color?: LcarsColor;
  capTop?: boolean;
  capBottom?: boolean;
}
export function LcarsBarVertical({
  color = 'primary',
  capTop,
  capBottom,
  className,
  ...rest
}: LcarsBarVerticalProps) {
  return (
    <div
      className={cx(
        'lcars-bar-vertical',
        `lcars-bar-vertical--${color}`,
        capTop && 'cap-top',
        capBottom && 'cap-bottom',
        className
      )}
      {...rest}
    />
  );
}

// ---- Bracket ----------------------------------------------------------------
export interface LcarsBracketProps extends Div {
  side?: 'full' | 'left' | 'right' | 'top' | 'bottom';
  color?: LcarsColor;
  solid?: boolean;
}
export function LcarsBracket({
  side = 'full',
  color = 'primary',
  solid,
  className,
  children,
  ...rest
}: LcarsBracketProps) {
  return (
    <div
      className={cx(
        'lcars-bracket',
        `lcars-bracket--${side}`,
        `lcars-bracket--${color}`,
        solid && 'lcars-bracket--solid',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ---- Text box ---------------------------------------------------------------
export interface LcarsTextBoxProps extends Div {
  size?: 'default' | 'big' | 'large' | 'huge';
  align?: 'left' | 'center' | 'right';
  middle?: boolean;
  bottom?: boolean;
  textColor?: LcarsColor;
}
export function LcarsTextBox({
  size = 'default',
  align = 'left',
  middle,
  bottom,
  textColor,
  className,
  children,
  ...rest
}: LcarsTextBoxProps) {
  return (
    <div
      className={cx(
        'lcars-textbox',
        size !== 'default' && `lcars-textbox--${size}`,
        align === 'center' && 'lcars-textbox--center',
        align === 'right' && 'lcars-textbox--right',
        middle && 'lcars-textbox--middle',
        bottom && 'lcars-textbox--bottom',
        textColor && `lcars-textbox--text-${textColor}`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ---- Readout (label / value) ------------------------------------------------
export interface LcarsReadoutProps extends Div {
  label?: React.ReactNode;
  value?: React.ReactNode;
  color?: LcarsColor;
  right?: boolean;
}
export function LcarsReadout({
  label,
  value,
  color,
  right,
  className,
  children,
  ...rest
}: LcarsReadoutProps) {
  return (
    <div
      className={cx(
        'lcars-readout',
        color && `lcars-readout--${color}`,
        right && 'lcars-readout--right',
        className
      )}
      {...rest}
    >
      {label != null && <span className="lcars-readout__label">{label}</span>}
      {value != null && <span className="lcars-readout__value">{value}</span>}
      {children}
    </div>
  );
}
