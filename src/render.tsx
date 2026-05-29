import * as React from 'react';
import { LcarsRow, LcarsColumn, LcarsPanel, LcarsSpacer, LcarsGrow } from './components/layout';

/**
 * A node in a JSON-described screen. `type` selects a structural layout node
 * (`row`/`column`/`panel`/`spacer`/`grow`) or a registry widget key. Structural
 * nodes recurse through `content`; any other field is passed to the resolved
 * widget by its registry definition.
 */
export interface LcarsNode {
  type: string;
  content?: LcarsNode[];
  [key: string]: unknown;
}

/**
 * How a registry widget is built from a node. In React, an Angular "input" is a
 * prop and an "output"/DOM event is a callback prop, so both collapse into
 * `props`; projected text/content is `children`.
 */
export interface LcarsWidgetDef {
  /** The component to render. */
  component: React.ComponentType<any>;
  /** Map node fields → component props (incl. event callbacks like onClick). */
  props?: (node: LcarsNode) => Record<string, unknown>;
  /** Children to render inside the component (e.g. a button label). */
  children?: (node: LcarsNode) => React.ReactNode;
}

/** Maps a node `type` to the widget that renders it. App-supplied. */
export type LcarsWidgetRegistry = Record<string, LcarsWidgetDef>;

export interface LcarsRenderProps {
  node: LcarsNode;
  registry: LcarsWidgetRegistry;
}

/**
 * Recursive, registry-driven screen renderer. Structural node types map to the
 * lcars layout components and recurse over `content`; everything else resolves
 * through the supplied registry. Carries no domain knowledge — the consumer's
 * registry owns widget semantics.
 *
 *   <LcarsRender node={screen} registry={myRegistry} />
 */
export function LcarsRender({ node, registry }: LcarsRenderProps): React.ReactElement | null {
  const children = (node.content ?? []).map((c, i) => (
    <LcarsRender key={i} node={c} registry={registry} />
  ));
  const flag = (k: string) => !!(node as Record<string, unknown>)[k];

  switch (node.type) {
    case 'row':
      return <LcarsRow fill={flag('fill')}>{children}</LcarsRow>;
    case 'column':
      return <LcarsColumn fill={flag('fill')}>{children}</LcarsColumn>;
    case 'panel':
      return <LcarsPanel>{children}</LcarsPanel>;
    case 'spacer':
      return <LcarsSpacer />;
    case 'grow':
      return <LcarsGrow />;
    default: {
      const def = registry[node.type];
      if (!def) return null;
      const Comp = def.component;
      const props = def.props ? def.props(node) : {};
      const kids = def.children ? def.children(node) : undefined;
      return <Comp {...props}>{kids}</Comp>;
    }
  }
}
