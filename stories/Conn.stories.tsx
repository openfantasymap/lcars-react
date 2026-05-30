import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsCompass, LcarsScanner, LcarsScannerContact, LcarsStarmap, LcarsStar,
  LcarsStarmapShip, LcarsStarmapWaypoint, LcarsStarmapCourse, LcarsStarmapLabel,
  LcarsHelm, LcarsRow,
} from '../src';

const meta: Meta = { title: 'Conn' };
export default meta;
type S = StoryObj;

export const Compass: S = {
  args: { heading: 87, mark: 21 },
  argTypes: {
    heading: { control: { type: 'range', min: 0, max: 359, step: 1 } },
    mark: { control: { type: 'range', min: 0, max: 90, step: 1 } },
  },
  render: (a: any) => <LcarsCompass heading={a.heading} mark={a.mark} />,
};

export const Scanner: S = {
  render: () => (
    <LcarsScanner rate={3} scopeR={9}>
      <LcarsScannerContact range={40} bearing={30} />
      <LcarsScannerContact range={65} bearing={120} kind="neutral" />
      <LcarsScannerContact range={85} bearing={210} kind="hostile" />
      <LcarsScannerContact range={55} bearing={300} kind="hostile" />
    </LcarsScanner>
  ),
};

export const StellarMap: S = {
  render: () => (
    <LcarsStarmap>
      <LcarsStar x={12} y={22} />
      <LcarsStar x={30} y={70} variant="giant" />
      <LcarsStar x={48} y={30} />
      <LcarsStar x={82} y={55} variant="giant" />
      <LcarsStar x={62} y={80} variant="dim" />
      <LcarsStarmapCourse x={28} y={55} length="12.47rem" angle={-17.6} />
      <LcarsStarmapShip x={28} y={55} rot={72.4} />
      <LcarsStarmapWaypoint x={82} y={28} />
      <LcarsStarmapLabel>SECTOR 001 · DEEP SPACE</LcarsStarmapLabel>
    </LcarsStarmap>
  ),
};

export const Helm: S = {
  args: { warp: 6.2, impulse: 75, throttle: 80 },
  argTypes: {
    warp: { control: { type: 'range', min: 0, max: 9, step: 0.1 } },
    impulse: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    throttle: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  render: (a: any) => (
    <LcarsHelm warp={a.warp} impulse={a.impulse} throttle={a.throttle}
      readouts={[{ label: 'Heading', value: '087' }, { label: 'ETA', value: '00:18', color: 'success' }]} />
  ),
};
