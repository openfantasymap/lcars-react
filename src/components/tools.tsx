import * as React from 'react';
import { cx, styleVars } from '../cx';
import type { LcarsColor } from '../types';

// ---- Button -----------------------------------------------------------------
export interface LcarsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: LcarsColor;
  shape?: 'default' | 'rounded' | 'left' | 'square';
  inactive?: boolean;
  badge?: React.ReactNode;
}
export function LcarsButton({
  color = 'primary',
  shape = 'default',
  inactive,
  badge,
  className,
  children,
  type = 'button',
  ...rest
}: LcarsButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'lcars-button',
        `lcars-button--${color}`,
        shape !== 'default' && `lcars-button--${shape}`,
        inactive && 'lcars-button--inactive',
        className
      )}
      {...rest}
    >
      {badge != null && <span className="lcars-button__badge">{badge}</span>}
      {children}
    </button>
  );
}

// ---- Toggle -----------------------------------------------------------------
export interface LcarsToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'color'> {
  label?: React.ReactNode;
  color?: LcarsColor;
}
export function LcarsToggle({
  label,
  color = 'success',
  className,
  disabled,
  ...inputProps
}: LcarsToggleProps) {
  return (
    <label className={cx('lcars-toggle', `lcars-toggle--${color}`, disabled && 'is-disabled', className)}>
      <input type="checkbox" className="lcars-toggle__input" disabled={disabled} {...inputProps} />
      <span className="lcars-toggle__track">
        <span className="lcars-toggle__knob" />
      </span>
      {label != null && <span className="lcars-toggle__label">{label}</span>}
    </label>
  );
}

// ---- Slider -----------------------------------------------------------------
export interface LcarsSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  color?: LcarsColor;
  orientation?: 'horizontal' | 'vertical';
  showValue?: boolean;
}
export function LcarsSlider({
  value,
  color = 'primary',
  orientation = 'horizontal',
  showValue,
  className,
  style,
  ...rest
}: LcarsSliderProps) {
  return (
    <div
      className={cx(
        'lcars-slider',
        orientation === 'vertical' && 'lcars-slider--vertical',
        `lcars-slider--${color}`,
        className
      )}
      style={styleVars(style, { '--value': value })}
      {...rest}
    >
      <div className="lcars-slider__track">
        <div className="lcars-slider__fill" />
        <div className="lcars-slider__knob" />
      </div>
      {showValue && orientation === 'horizontal' && (
        <span className="lcars-slider__value">{Math.round(value)}%</span>
      )}
    </div>
  );
}

// ---- Keypad -----------------------------------------------------------------
export interface LcarsKeypadProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  mono?: boolean;
}
export function LcarsKeypad({ cols = 3, mono, className, style, children, ...rest }: LcarsKeypadProps) {
  return (
    <div
      className={cx('lcars-keypad', mono && 'lcars-keypad--mono', className)}
      style={styleVars(style, { '--cols': cols })}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface LcarsKeypadKeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  wide?: boolean;
  accent?: boolean;
}
export function LcarsKeypadKey({ wide, accent, className, type = 'button', children, ...rest }: LcarsKeypadKeyProps) {
  return (
    <button
      type={type}
      className={cx(
        'lcars-keypad__key',
        wide && 'lcars-keypad__key--wide',
        accent && 'lcars-keypad__key--accent',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---- Indicator --------------------------------------------------------------
export type LcarsIndicatorState = 'online' | 'standby' | 'offline' | 'alert';
export interface LcarsIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  state?: LcarsIndicatorState;
  label?: React.ReactNode;
}
export function LcarsIndicator({ state = 'online', label, className, children, ...rest }: LcarsIndicatorProps) {
  return (
    <span className={cx('lcars-indicator', `lcars-indicator--${state}`, className)} {...rest}>
      <span className="lcars-indicator__light" />
      {label != null && <span className="lcars-indicator__label">{label}</span>}
      {children}
    </span>
  );
}
