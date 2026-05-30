import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsElbow, LcarsBar, LcarsBarGroup, LcarsBarVertical, LcarsBracket,
  LcarsTextBox, LcarsReadout, LcarsRow, LcarsColumn, COLOR_ROLES,
} from '../src';

const meta: Meta = { title: 'Primitives' };
export default meta;
type S = StoryObj;

export const Elbow: S = {
  args: { corner: 'left-bottom', color: 'primary', label: 'DECK 5', width: 16, height: 5 },
  argTypes: {
    corner: { control: 'inline-radio', options: ['left-bottom', 'left-top', 'right-bottom', 'right-top'] },
    color: { control: 'select', options: COLOR_ROLES },
    label: { control: 'text' },
    width: { control: { type: 'range', min: 8, max: 28, step: 0.5 } },
    height: { control: { type: 'range', min: 3, max: 16, step: 0.5 } },
  },
  render: (a: any) => (
    <LcarsElbow corner={a.corner} color={a.color} label={a.label}
      style={{ width: `${a.width}rem`, height: `${a.height}rem` }} />
  ),
};

export const Bars: S = {
  render: () => (
    <LcarsColumn style={{ gap: '0.5rem' }}>
      <LcarsBarGroup thick>
        <LcarsBar color="primary" cap="left" style={{ minWidth: '3rem' }} />
        <LcarsBar color="primary" fill title="SENSORS" />
        <LcarsBar color="accent" cap="right" decorated style={{ minWidth: '5rem' }} />
      </LcarsBarGroup>
      <LcarsRow style={{ gap: '0.75rem', height: '12rem' }}>
        {(['primary', 'secondary', 'tertiary', 'butterscotch'] as const).map((c) => (
          <LcarsBarVertical key={c} color={c} capTop capBottom />
        ))}
      </LcarsRow>
    </LcarsColumn>
  ),
};

export const Brackets: S = {
  render: () => (
    <LcarsRow wrap style={{ gap: '1rem' }}>
      {(['full', 'left', 'right', 'top', 'bottom'] as const).map((s) => (
        <LcarsBracket key={s} side={s} color="secondary" style={{ maxWidth: '12rem' }}>
          <strong>{s}</strong> bracket
        </LcarsBracket>
      ))}
    </LcarsRow>
  ),
};

export const TextBoxesAndReadouts: S = {
  name: 'Text boxes & readouts',
  render: () => (
    <LcarsColumn style={{ gap: '0.75rem', alignItems: 'flex-start' }}>
      <LcarsTextBox size="large" middle textColor="primary">STARDATE 47988.1</LcarsTextBox>
      <LcarsRow wrap style={{ gap: '1rem' }}>
        <LcarsReadout label="Shields" value="98%" />
        <LcarsReadout label="Hull" value="100%" color="success" />
        <LcarsReadout label="Power" value="62%" color="warning" />
        <LcarsReadout label="Antimatter" value="11%" color="danger" right />
      </LcarsRow>
    </LcarsColumn>
  ),
};
