import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsComms, LcarsCommsChannel, LcarsWaveform, LcarsHail, LcarsButton, LcarsColumn,
} from '../src';

const meta: Meta = { title: 'Communications' };
export default meta;
type S = StoryObj;

export const CommsPanel: S = {
  render: () => (
    <LcarsComms title="Subspace Comms" freq="141.55 MHz">
      <LcarsCommsChannel name="Starfleet Command" signal={96} active />
      <LcarsCommsChannel name="USS Defiant" signal={78} />
      <LcarsCommsChannel name="Deep Space 9" signal={64} />
      <LcarsCommsChannel name="Emergency Channel" signal={12} />
    </LcarsComms>
  ),
};

export const Waveform: S = {
  args: { level: 70, live: true },
  argTypes: {
    level: { control: { type: 'range', min: 5, max: 100, step: 1 } },
    live: { control: 'boolean' },
  },
  render: (a: any) => (
    <LcarsWaveform live={a.live} style={{ width: '26rem' }}
      values={Array.from({ length: 28 }, (_, i) =>
        Math.max(6, Math.round((Math.abs(Math.sin(i * 0.6)) * 0.7 + Math.abs(Math.sin(i * 0.21)) * 0.3) * a.level))
      )} />
  ),
};

export const Hail: S = {
  render: () => (
    <LcarsColumn style={{ gap: '0.75rem', maxWidth: '34rem' }}>
      <LcarsHail title="Incoming Transmission" subtitle="USS Defiant · Priority One" variant="incoming"
        actions={<>
          <LcarsButton color="success" shape="rounded">Accept</LcarsButton>
          <LcarsButton color="danger" shape="rounded">Reject</LcarsButton>
        </>} />
      <LcarsHail title="Secure Channel" subtitle="Encrypted · Starfleet Intelligence" variant="secure" />
      <LcarsHail title="Priority One" subtitle="Fleet-wide distress" variant="priority" />
    </LcarsColumn>
  ),
};
