import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LcarsOverview } from '../src';

const SVG = `
<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg">
  <g>
    <line class="lcars-svg-conduit" x1="210" y1="130" x2="210" y2="42"/>
    <line class="lcars-svg-conduit" x1="190" y1="120" x2="75" y2="89"/>
    <line class="lcars-svg-conduit" x1="190" y1="140" x2="75" y2="195"/>
    <line class="lcars-svg-conduit" x1="230" y1="120" x2="345" y2="89"/>
    <line class="lcars-svg-conduit" x1="230" y1="140" x2="345" y2="195"/>
    <line class="lcars-svg-conduit" x1="210" y1="155" x2="210" y2="227"/>
  </g>
  <rect data-lcars-region data-lcars-id="reactor" data-lcars-label="M/ARA Reactor" data-lcars-status="nominal" x="170" y="105" width="80" height="50" rx="8"/>
  <text class="lcars-svg-label" x="210" y="134" font-size="11">REACTOR</text>
  <rect data-lcars-region data-lcars-id="bridge" data-lcars-label="Main Bridge" data-lcars-status="nominal" x="170" y="25" width="80" height="34" rx="6"/>
  <text class="lcars-svg-label" x="210" y="46" font-size="11">BRIDGE</text>
  <rect data-lcars-region data-lcars-id="shields" data-lcars-label="Shield Grid" data-lcars-status="warning" x="20" y="72" width="110" height="34" rx="6"/>
  <text class="lcars-svg-label" x="75" y="93" font-size="11">SHIELDS</text>
  <rect data-lcars-region data-lcars-id="weapons" data-lcars-label="Weapons Array" data-lcars-status="nominal" x="20" y="178" width="110" height="34" rx="6"/>
  <text class="lcars-svg-label" x="75" y="199" font-size="11">WEAPONS</text>
  <rect data-lcars-region data-lcars-id="sensors" data-lcars-label="Sensor Pallets" data-lcars-status="nominal" x="290" y="72" width="110" height="34" rx="6"/>
  <text class="lcars-svg-label" x="345" y="93" font-size="11">SENSORS</text>
  <rect data-lcars-region data-lcars-id="life" data-lcars-label="Life Support" data-lcars-status="nominal" x="290" y="178" width="110" height="34" rx="6"/>
  <text class="lcars-svg-label" x="345" y="199" font-size="11">LIFE SUPPORT</text>
  <rect data-lcars-region data-lcars-id="nacelles" data-lcars-label="Warp Nacelles" data-lcars-status="critical" x="150" y="210" width="120" height="34" rx="6"/>
  <text class="lcars-svg-label" x="210" y="231" font-size="11">NACELLES</text>
</svg>`;

const meta: Meta = { title: 'Overview' };
export default meta;
type S = StoryObj;

export const Schematic: S = {
  render: () => {
    const [sel, setSel] = React.useState('—');
    return (
      <>
        <LcarsOverview svg={SVG} title="Systems Overview" style={{ maxWidth: '34rem' }}
          onSelect={(_id, el) => setSel(el.getAttribute('data-lcars-label') || _id)} />
        <div className="lcars-readout" style={{ marginTop: '0.75rem' }}>
          <span className="lcars-readout__label">Selected</span>
          <span className="lcars-readout__value">{sel}</span>
        </div>
      </>
    );
  },
};
