'use client';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { loadOverview, type OverviewApi, type LcarsStore } from '@openfantasymap/lcars-core/js';
import { cx } from '../cx';

export interface LcarsOverviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** SVG markup, an <svg> element, or a `.svg` URL */
  svg: string | SVGElement;
  title?: React.ReactNode;
  summary?: React.ReactNode;
  legend?: boolean;
  /** bind to this store (data-bind-* inside the SVG go live) */
  store?: LcarsStore;
  /** if no store is given, auto-seed + bind a store from the SVG annotations */
  autoConnect?: boolean;
  onSelect?: (id: string, el: Element) => void;
  onReady?: (ov: OverviewApi) => void;
}

export function LcarsOverview({
  svg,
  title,
  summary,
  legend = true,
  store,
  autoConnect,
  onSelect,
  onReady,
  className,
  ...rest
}: LcarsOverviewProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  const onReadyRef = useRef(onReady);
  onSelectRef.current = onSelect;
  onReadyRef.current = onReady;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let unbind: (() => void) | undefined;

    loadOverview(host, svg, {
      legend,
      onSelect: (id, el) => onSelectRef.current?.(id, el),
    }).then((ov) => {
      if (cancelled) return;
      if (store) unbind = ov.bind(store);
      else if (autoConnect) {
        ov.connect();
        unbind = (ov as unknown as { _unbind?: () => void })._unbind;
      }
      onReadyRef.current?.(ov);
    });

    return () => {
      cancelled = true;
      if (unbind) unbind();
    };
  }, [svg, store, legend, autoConnect]);

  return (
    <div className={cx('lcars-overview', className)} ref={hostRef} {...rest}>
      <div className="lcars-overview__header">
        {title != null && <span className="lcars-overview__title">{title}</span>}
        <span className="lcars-overview__summary" {...(summary != null ? { 'data-locked': '' } : {})}>
          {summary}
        </span>
      </div>
      <div className="lcars-overview__stage" />
      {legend && <div className="lcars-overview__legend" />}
    </div>
  );
}
