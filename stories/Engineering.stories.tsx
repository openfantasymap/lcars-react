import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LcarsConduit, LcarsPower, LcarsPowerRow, LcarsMsd, LcarsColumn } from '../src';

const meta: Meta = { title: 'Engineering' };
export default meta;
type S = StoryObj;

export const Conduit: S = {
  args: { load: 70, state: 'normal' },
  argTypes: {
    load: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    state: { control: 'inline-radio', options: ['normal', 'critical', 'offline'] },
  },
  render: (a: any) => (
    <LcarsColumn style={{ gap: '0.5rem', maxWidth: '24rem' }}>
      <LcarsConduit load={a.load} state={a.state} style={{ width: '24rem' }} />
      <LcarsConduit load={90} style={{ width: '24rem' }} />
      <LcarsConduit load={30} state="critical" style={{ width: '24rem' }} />
    </LcarsColumn>
  ),
};

export const PowerDistribution: S = {
  render: () => (
    <LcarsPower title="Power Distribution" total="EPS · 1.21 GW">
      <LcarsPowerRow label="Warp Drive" value={88} />
      <LcarsPowerRow label="Shields" value={72} />
      <LcarsPowerRow label="Weapons" value={64} state="warning" />
      <LcarsPowerRow label="Life Support" value={100} />
      <LcarsPowerRow label="Deflector" value={28} state="critical" />
    </LcarsPower>
  ),
};

export const MasterSystemsDisplay: S = {
  name: 'Master systems display',
  args: { saucer: 'nominal', hull: 'warning', nacelleLeft: 'nominal', nacelleRight: 'critical' },
  argTypes: {
    saucer: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
    hull: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
    nacelleLeft: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
    nacelleRight: { control: 'inline-radio', options: ['nominal', 'warning', 'critical', 'offline'] },
  },
  render: (a: any) => (
    <LcarsMsd saucer={a.saucer} hull={a.hull} nacelleLeft={a.nacelleLeft} nacelleRight={a.nacelleRight}
      name="USS ENTERPRISE · NCC-1701-D" />
  ),
};
