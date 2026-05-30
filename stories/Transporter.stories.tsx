import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LcarsTransporterPad, LcarsTransporter, LcarsButton, LcarsColumn, LcarsRow } from '../src';

const meta: Meta = { title: 'Transporter' };
export default meta;
type S = StoryObj;

export const PadPlatform: S = {
  args: { energizing: false, active: 0 },
  argTypes: {
    energizing: { control: 'boolean' },
    active: { control: { type: 'range', min: 0, max: 6, step: 1 } },
  },
  render: (a: any) => <LcarsTransporterPad energizing={a.energizing} active={a.active} locked />,
};

export const Chamber: S = {
  args: { state: 'cycle', rate: 2.4 },
  argTypes: {
    state: { control: 'inline-radio', options: ['materialized', 'cycle', 'energizing', 'dematerializing', 'materializing'] },
    rate: { control: { type: 'range', min: 1, max: 5, step: 0.2 } },
  },
  render: (a: any) => <LcarsTransporter subject="🖖" state={a.state} rate={a.rate} />,
};

export const EnergizeConsole: S = {
  name: 'Energize (data-driven progress)',
  render: () => {
    const [progress, setProgress] = React.useState(100);
    const [busy, setBusy] = React.useState(false);
    const energize = () => {
      if (busy) return;
      setBusy(true);
      const target = progress > 50 ? 0 : 100;
      const dir = target > progress ? 1 : -1;
      let p = progress;
      const t = setInterval(() => {
        p += dir * 4;
        if ((dir > 0 && p >= 100) || (dir < 0 && p <= 0)) { p = target; clearInterval(t); setBusy(false); }
        setProgress(p);
      }, 40);
    };
    return (
      <LcarsRow style={{ gap: '1.5rem', alignItems: 'flex-start' }}>
        <LcarsTransporter subject="🖖" progress={progress} />
        <LcarsColumn style={{ gap: '0.5rem' }}>
          <LcarsButton color="accent" shape="rounded" onClick={energize}>Energize</LcarsButton>
          <div className="lcars-readout"><span className="lcars-readout__label">Pattern</span>
            <span className="lcars-readout__value">{Math.round(progress)}%</span></div>
        </LcarsColumn>
      </LcarsRow>
    );
  },
};
