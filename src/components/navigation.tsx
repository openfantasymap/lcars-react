import * as React from 'react';
import { cx } from '../cx';
import type { LcarsColor } from '../types';

// ---- Nav --------------------------------------------------------------------
export interface LcarsNavProps extends React.HTMLAttributes<HTMLElement> {
  mono?: boolean;
  orientation?: 'vertical' | 'horizontal';
}
export function LcarsNav({ mono, orientation = 'vertical', className, children, ...rest }: LcarsNavProps) {
  return (
    <nav
      className={cx('lcars-nav', mono && 'lcars-nav--mono', orientation === 'horizontal' && 'lcars-nav--horizontal', className)}
      {...rest}
    >
      {children}
    </nav>
  );
}

export interface LcarsNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  color?: LcarsColor;
}
export function LcarsNavItem({ active, color, className, children, ...rest }: LcarsNavItemProps) {
  return (
    <a
      className={cx('lcars-nav__item', active && 'is-active', color && `lcars-nav__item--${color}`, className)}
      {...rest}
    >
      {children}
    </a>
  );
}

export function LcarsNavSpacer() {
  return <span className="lcars-nav__spacer" />;
}
export function LcarsNavGroup({ className, children, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx('lcars-nav__group', className)} {...rest}>
      {children}
    </span>
  );
}

// ---- Tabs -------------------------------------------------------------------
export interface LcarsTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}
export function LcarsTabs({ orientation = 'horizontal', className, children, ...rest }: LcarsTabsProps) {
  return (
    <div className={cx('lcars-tabs', orientation === 'vertical' && 'lcars-tabs--vertical', className)} {...rest}>
      {children}
    </div>
  );
}

export interface LcarsTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}
export function LcarsTab({ active, className, type = 'button', children, ...rest }: LcarsTabProps) {
  return (
    <button type={type} className={cx('lcars-tabs__tab', active && 'is-active', className)} {...rest}>
      {children}
    </button>
  );
}

// ---- Breadcrumb -------------------------------------------------------------
export interface LcarsBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: 'chevron' | 'ticks';
}
export function LcarsBreadcrumb({ separator = 'chevron', className, children, ...rest }: LcarsBreadcrumbProps) {
  return (
    <nav className={cx('lcars-breadcrumb', separator === 'ticks' && 'lcars-breadcrumb--ticks', className)} {...rest}>
      {children}
    </nav>
  );
}

export interface LcarsCrumbProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}
export function LcarsCrumb({ current, className, children, ...rest }: LcarsCrumbProps) {
  return (
    <a className={cx('lcars-breadcrumb__crumb', current && 'is-current', className)} {...rest}>
      {children}
    </a>
  );
}
