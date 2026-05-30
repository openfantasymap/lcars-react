import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useLcarsStore, useLcarsValues, useSimulate,
  LcarsGauge, LcarsCompass, LcarsHelm, LcarsWarpCore, LcarsConduit, LcarsWaveform,
  LcarsIndicator, LcarsBarGroup, LcarsBar, LcarsRow, LcarsColumn,
} from '../src';

const meta: Meta = { title: 'Realtime' };
export default meta;
type S = StoryObj;

function BridgeOps() {
  const store = useLcarsStore({
    hull: 100, shields: 98, power: 80, warp: 5, impulse: 50, throttle: 60,
    heading: 87, eps: 75, e0: 40, e1: 60, e2: 30, e3: 80, e4: 50, e5: 70,
  });
  useSimulate(store, {
    hull: { min: 25, max: 100, step: 9 }, shields: { min: 10, max: 100, step: 12 }, power: [40, 100],
    warp: { min: 1, max: 9, step: 0.5 }, impulse: [20, 100], throttle: [20, 100],
    heading: { min: 0, max: 359, step: 12, wrap: true }, eps: [30, 100],
    e0: [10, 100], e1: [10, 100], e2: [10, 100], e3: [10, 100], e4: [10, 100], e5: [10, 100],
  }, 600);

  const s = useLcarsValues(store, ['hull', 'shields', 'power', 'warp', 'impulse', 'throttle', 'heading', 'eps', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5']);
  const redAlert = s.hull < 45 || s.shields < 30;

  return (
    <LcarsColumn style={{ gap: '0.75rem' }}>
      <LcarsBarGroup thick>
        <LcarsBar color="primary" cap="left" style={{ minWidth: '3rem' }} />
        <LcarsBar color="primary" fill title="USS ENTERPRISE · BRIDGE OPS" />
        <LcarsBar color="danger" cap="right" className={redAlert ? 'lcars-blink' : ''} style={{ minWidth: '4rem' }} />
      </LcarsBarGroup>
      <LcarsRow wrap style={{ gap: '1.25rem', alignItems: 'flex-start' }}>
        <LcarsRow style={{ gap: '1rem' }}>
          <LcarsGauge value={s.hull} color="success" size="sm" label="Hull" />
          <LcarsGauge value={s.shields} color={s.shields < 30 ? 'danger' : 'primary'} size="sm" label="Shields" />
          <LcarsGauge value={s.power} color="warning" size="sm" label="Power" />
        </LcarsRow>
        <LcarsCompass heading={s.heading} size="11rem" />
        <LcarsHelm warp={s.warp} impulse={s.impulse} throttle={s.throttle} style={{ minWidth: '18rem' }} />
        <LcarsWarpCore state={redAlert ? 'critical' : 'running'} style={{ height: '14rem' }} />
        <LcarsColumn style={{ gap: '0.5rem', minWidth: '18rem' }}>
          <LcarsConduit load={s.eps} style={{ width: '18rem' }} />
          <LcarsWaveform values={[s.e0, s.e1, s.e2, s.e3, s.e4, s.e5, s.e0, s.e1, s.e2, s.e3, s.e4, s.e5]} style={{ width: '18rem' }} />
          <LcarsIndicator state={redAlert ? 'alert' : 'online'} label={redAlert ? 'Red Alert' : 'Condition Green'} />
        </LcarsColumn>
      </LcarsRow>
    </LcarsColumn>
  );
}

export const BridgeOpsDashboard: S = {
  name: 'Bridge Ops (live)',
  render: () => <BridgeOps />,
};
