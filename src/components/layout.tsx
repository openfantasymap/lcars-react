import * as React from 'react';
import { cx } from '../cx';
import type { LcarsTheme } from '../types';

type Div = React.HTMLAttributes<HTMLDivElement>;

/** Root wrapper: applies `.lcars` (theme tokens + font) and an optional theme. */
export interface LcarsRootProps extends Div {
  theme?: LcarsTheme;
}
export function Lcars({ theme, className, children, ...rest }: LcarsRootProps) {
  return (
    <div className={cx('lcars', theme && `lcars-theme-${theme}`, className)} {...rest}>
      {children}
    </div>
  );
}

export interface LcarsRowProps extends Div {
  fill?: boolean;
  centered?: boolean;
  fullCentered?: boolean;
  right?: boolean;
  spaceBetween?: boolean;
  bottom?: boolean;
  wrap?: boolean;
}
export function LcarsRow({
  fill,
  centered,
  fullCentered,
  right,
  spaceBetween,
  bottom,
  wrap,
  className,
  children,
  ...rest
}: LcarsRowProps) {
  return (
    <div
      className={cx(
        'lcars-row',
        fill && 'fill',
        centered && 'centered',
        fullCentered && 'full-centered',
        right && 'right',
        spaceBetween && 'space-between',
        bottom && 'bottom',
        wrap && 'wrap',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface LcarsColumnProps extends Div {
  fill?: boolean;
  centered?: boolean;
  fullCentered?: boolean;
  centeredRight?: boolean;
  bottom?: boolean;
}
export function LcarsColumn({
  fill,
  centered,
  fullCentered,
  centeredRight,
  bottom,
  className,
  children,
  ...rest
}: LcarsColumnProps) {
  return (
    <div
      className={cx(
        'lcars-column',
        fill && 'fill',
        centered && 'centered',
        fullCentered && 'full-centered',
        centeredRight && 'centered-right',
        bottom && 'bottom',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function LcarsPanel({ className, children, ...rest }: Div) {
  return (
    <div className={cx('lcars-panel', className)} {...rest}>
      {children}
    </div>
  );
}

// App shell
export function LcarsApp({ className, children, ...rest }: Div) {
  return (
    <div className={cx('lcars-app', className)} {...rest}>
      {children}
    </div>
  );
}
export function LcarsAppSidebar({ className, children, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside className={cx('lcars-app__sidebar', className)} {...rest}>
      {children}
    </aside>
  );
}
export function LcarsAppHeader({ className, children, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cx('lcars-app__header', className)} {...rest}>
      {children}
    </header>
  );
}
export function LcarsAppContent({ className, children, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <main className={cx('lcars-app__content', className)} {...rest}>
      {children}
    </main>
  );
}

export function LcarsSpacer({ className, ...rest }: Div) {
  return <div className={cx('lcars-spacer', className)} {...rest} />;
}
export function LcarsGrow({ className, ...rest }: Div) {
  return <div className={cx('lcars-grow', className)} {...rest} />;
}
