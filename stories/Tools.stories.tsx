import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsButton, LcarsToggle, LcarsSlider, LcarsKeypad, LcarsKeypadKey,
  LcarsIndicator, LcarsDpad, LcarsRow, LcarsColumn, COLOR_ROLES,
} from '../src';

const meta: Meta = { title: 'Tools' };
export default meta;
type S = StoryObj;

export const Button: S = {
  args: { color: 'primary', shape: 'rounded', label: 'Engage', inactive: false, disabled: false },
  argTypes: {
    color: { control: 'select', options: COLOR_ROLES },
    shape: { control: 'inline-radio', options: ['default', 'rounded', 'left', 'square'] },
    label: { control: 'text' },
    inactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (a: any) => (
    <LcarsButton color={a.color} shape={a.shape} inactive={a.inactive} disabled={a.disabled}>
      {a.label}
    </LcarsButton>
  ),
};

export const ButtonPalette: S = {
  render: () => (
    <LcarsRow wrap style={{ gap: '0.5rem' }}>
      {COLOR_ROLES.map((c) => (
        <LcarsButton key={c} color={c} shape="rounded">{c}</LcarsButton>
      ))}
    </LcarsRow>
  ),
};

export const Toggles: S = {
  render: () => (
    <LcarsColumn style={{ gap: '0.75rem', alignItems: 'flex-start' }}>
      <LcarsToggle label="Inertial Dampers" defaultChecked color="success" />
      <LcarsToggle label="Tractor Beam" defaultChecked color="warning" />
      <LcarsToggle label="Self Destruct" color="danger" />
    </LcarsColumn>
  ),
};

export const Sliders: S = {
  render: () => (
    <LcarsColumn style={{ gap: '1rem', maxWidth: '24rem' }}>
      <LcarsSlider value={72} color="primary" showValue />
      <LcarsSlider value={40} color="secondary" showValue />
      <LcarsSlider value={90} color="danger" showValue />
    </LcarsColumn>
  ),
};

export const Keypad: S = {
  render: () => (
    <LcarsKeypad cols={3}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
        <LcarsKeypadKey key={k}>{k}</LcarsKeypadKey>
      ))}
    </LcarsKeypad>
  ),
};

export const Indicators: S = {
  render: () => (
    <LcarsColumn style={{ gap: '0.6rem', alignItems: 'flex-start' }}>
      <LcarsIndicator state="online" label="Life Support" />
      <LcarsIndicator state="standby" label="Transporters" />
      <LcarsIndicator state="offline" label="Holodeck 3" />
      <LcarsIndicator state="alert" label="Hull Breach" />
    </LcarsColumn>
  ),
};

export const Dpad: S = {
  render: () => {
    const [dir, setDir] = React.useState('—');
    return (
      <LcarsColumn style={{ gap: '0.75rem', alignItems: 'flex-start' }}>
        <LcarsDpad onSelect={setDir} />
        <div className="lcars-readout">
          <span className="lcars-readout__label">Heading</span>
          <span className="lcars-readout__value">{dir}</span>
        </div>
      </LcarsColumn>
    );
  },
};
