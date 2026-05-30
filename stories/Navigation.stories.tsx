import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LcarsNav, LcarsNavItem, LcarsNavSpacer, LcarsTabs, LcarsTab,
  LcarsBreadcrumb, LcarsCrumb, LcarsColumn, LcarsPanel,
} from '../src';

const meta: Meta = { title: 'Navigation' };
export default meta;
type S = StoryObj;
const ITEMS = ['Bridge', 'Engineering', 'Sickbay', 'Tactical', 'Science', 'Holodeck'];

export const Nav: S = {
  args: { active: 0 },
  argTypes: { active: { control: { type: 'range', min: 0, max: 5, step: 1 } } },
  render: (a: any) => (
    <LcarsNav>
      {ITEMS.map((it, i) => (
        <LcarsNavItem key={it} active={i === Number(a.active)}>{it}</LcarsNavItem>
      ))}
      <LcarsNavSpacer />
      <LcarsNavItem color="danger">Eject Core</LcarsNavItem>
    </LcarsNav>
  ),
};

export const Tabs: S = {
  args: { active: 0 },
  argTypes: { active: { control: { type: 'range', min: 0, max: 2, step: 1 } } },
  render: (a: any) => (
    <LcarsColumn style={{ gap: '0.25rem', maxWidth: '30rem' }}>
      <LcarsTabs>
        {['Tactical', 'Science', 'Comms'].map((t, i) => (
          <LcarsTab key={t} active={i === Number(a.active)}>{t}</LcarsTab>
        ))}
      </LcarsTabs>
      <LcarsPanel>
        <p style={{ margin: 0 }}>Panel content for the selected tab.</p>
      </LcarsPanel>
    </LcarsColumn>
  ),
};

export const Breadcrumb: S = {
  render: () => (
    <LcarsBreadcrumb>
      <LcarsCrumb>USS Enterprise</LcarsCrumb>
      <LcarsCrumb>Deck 5</LcarsCrumb>
      <LcarsCrumb>Section 7</LcarsCrumb>
      <LcarsCrumb current>Main Engineering</LcarsCrumb>
    </LcarsBreadcrumb>
  ),
};
