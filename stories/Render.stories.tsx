import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsRender, type LcarsWidgetRegistry,
  LcarsButton, LcarsGauge, LcarsReadout, LcarsBar, LcarsBarGroup,
} from '../src';

const meta: Meta = { title: 'Render' };
export default meta;
type S = StoryObj;

const registry: LcarsWidgetRegistry = {
  title: {
    component: LcarsBarGroup,
    props: () => ({ thick: true }),
    children: (n) => (
      <>
        <LcarsBar color="primary" cap="left" style={{ minWidth: '3rem' }} />
        <LcarsBar color="primary" fill title={String(n.text)} />
        <LcarsBar color="accent" cap="right" style={{ minWidth: '4rem' }} />
      </>
    ),
  },
  gauge: { component: LcarsGauge, props: (n) => ({ value: n.value, color: n.color, label: n.label }) },
  readout: { component: LcarsReadout, props: (n) => ({ label: n.label, value: n.value, color: n.color }) },
  button: { component: LcarsButton, props: (n) => ({ color: n.color, shape: 'rounded' }), children: (n) => n.label },
};

const screen = {
  type: 'column',
  content: [
    { type: 'title', text: 'BRIDGE OPS' },
    {
      type: 'row', fill: true,
      content: [
        { type: 'gauge', value: 82, color: 'primary', label: 'Shields' },
        { type: 'gauge', value: 47, color: 'warning', label: 'Power' },
        { type: 'spacer' },
        { type: 'readout', label: 'Heading', value: '087' },
      ],
    },
    {
      type: 'row',
      content: [
        { type: 'button', color: 'primary', label: 'Engage' },
        { type: 'button', color: 'danger', label: 'Red Alert' },
      ],
    },
  ],
};

export const ConfigDriven: S = {
  name: 'Config-driven screen',
  render: () => (
    <div style={{ maxWidth: '40rem' }}>
      <LcarsRender node={screen as any} registry={registry} />
    </div>
  ),
};
