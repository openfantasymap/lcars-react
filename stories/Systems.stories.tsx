import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsGauge, LcarsBarGraph, LcarsWarpCore, LcarsAlert, LcarsDataCascade,
  LcarsRow, LcarsColumn, COLOR_ROLES,
} from '../src';

const meta: Meta = { title: 'Systems' };
export default meta;
type S = StoryObj;

export const Gauge: S = {
  args: { value: 68, color: 'primary', size: 'default', label: 'Shields' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'select', options: COLOR_ROLES },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    label: { control: 'text' },
  },
  render: (a: any) => <LcarsGauge value={a.value} color={a.color} size={a.size} label={a.label} />,
};

export const GaugeCluster: S = {
  render: () => (
    <LcarsRow wrap style={{ gap: '1.5rem', alignItems: 'center' }}>
      <LcarsGauge value={100} color="success" label="Hull" />
      <LcarsGauge value={82} color="primary" label="Shields" />
      <LcarsGauge value={47} color="warning" size="sm" label="Power" />
      <LcarsGauge value={14} color="danger" size="sm" label="Antimatter" />
    </LcarsRow>
  ),
};

export const BarGraph: S = {
  args: { live: false },
  argTypes: { live: { control: 'boolean' } },
  render: (a: any) => (
    <LcarsBarGraph live={a.live} style={{ width: '26rem' }}
      values={Array.from({ length: 12 }, (_, i) => 25 + ((i * 37 + 13) % 70))} />
  ),
};

export const WarpCore: S = {
  args: { state: 'running' },
  argTypes: { state: { control: 'inline-radio', options: ['running', 'critical', 'offline'] } },
  render: (a: any) => (
    <LcarsRow style={{ gap: '2rem', alignItems: 'center' }}>
      <LcarsWarpCore state={a.state} />
      <LcarsWarpCore state="critical" />
      <LcarsWarpCore state="offline" />
    </LcarsRow>
  ),
};

export const Alert: S = {
  args: { condition: 'red', flash: true, text: 'Red Alert · Hull Breach Deck 7' },
  argTypes: {
    condition: { control: 'inline-radio', options: ['red', 'yellow', 'blue', 'green'] },
    flash: { control: 'boolean' },
    text: { control: 'text' },
  },
  render: (a: any) => (
    <LcarsAlert condition={a.condition} flash={a.flash} text={a.text} style={{ maxWidth: '38rem' }} />
  ),
};

export const DataCascade: S = {
  render: () => (
    <LcarsDataCascade style={{ maxWidth: '24rem' }}
      lines={[
        { text: 'SCAN 0x4F · NOMINAL', tone: 'ok' },
        { text: 'PWR GRID 7 · 98.4%' },
        { text: 'WARN: PLASMA FLUX 0x9C', tone: 'alert' },
        { text: 'SHIELD HARMONIC · 4.7', tone: 'ok' },
        { text: 'NAV BUFFER · 0x00A1' },
      ]} />
  ),
};
