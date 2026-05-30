import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LcarsBarGroup, LcarsBar, LcarsReadout, LcarsButton, LcarsRow } from '../src';

const meta: Meta = { title: 'Introduction', parameters: { options: { showPanel: false } } };
export default meta;

export const Welcome: StoryObj = {
  render: () => (
    <div>
      <LcarsBarGroup thick style={{ marginBottom: '1rem' }}>
        <LcarsBar color="primary" cap="left" style={{ minWidth: '3rem' }} />
        <LcarsBar color="primary" fill title="@openfantasymap/lcars-react" />
        <LcarsBar color="accent" cap="right" decorated style={{ minWidth: '5rem' }} />
      </LcarsBarGroup>
      <h1 className="lcars-text-primary">LCARS · React</h1>
      <p>Typed React components + hooks over <strong>@openfantasymap/lcars-core</strong>.
         Use the <strong>Theme</strong> toolbar (top bar) to switch era/faction skins on any story.</p>
      <LcarsRow wrap style={{ gap: '1rem', margin: '1rem 0' }}>
        <LcarsReadout label="Components" value="56+" />
        <LcarsReadout label="Hooks" value="5" color="secondary" />
        <LcarsReadout label="Themes" value="8" color="tertiary" />
      </LcarsRow>
      <pre className="lcars-panel" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'var(--lcars-pale-canary)' }}>{`import '@openfantasymap/lcars-core/dist/lcars.css';
import { Lcars, LcarsGauge } from '@openfantasymap/lcars-react';

<Lcars theme="tng"><LcarsGauge value={68} label="Shields" /></Lcars>`}</pre>
      <LcarsRow wrap style={{ gap: '0.5rem' }}>
        <LcarsButton color="primary" shape="rounded">Primitives</LcarsButton>
        <LcarsButton color="secondary" shape="rounded">Tools</LcarsButton>
        <LcarsButton color="tertiary" shape="rounded">Systems</LcarsButton>
        <LcarsButton color="accent" shape="rounded">Conn / Eng / Comms</LcarsButton>
      </LcarsRow>
    </div>
  ),
};
