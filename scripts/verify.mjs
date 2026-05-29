// Render components to static markup (no browser) and assert class/var output.
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import * as L from '../dist/index.js';

const h = React.createElement;
let failures = 0;
function check(name, html, ...needles) {
  const missing = needles.filter((n) => !html.includes(n));
  if (missing.length) {
    failures++;
    console.error(`✗ ${name}\n   missing: ${JSON.stringify(missing)}\n   html: ${html}`);
  } else {
    console.log(`✓ ${name}`);
  }
}

check('Button', render(h(L.LcarsButton, { color: 'danger', shape: 'rounded' }, 'Engage')),
  'lcars-button', 'lcars-button--danger', 'lcars-button--rounded', 'Engage');

check('Gauge', render(h(L.LcarsGauge, { value: 68, color: 'primary', label: 'Shields' })),
  'lcars-gauge', 'lcars-gauge--primary', '--value:68', '>68<', 'Shields');

check('Slider', render(h(L.LcarsSlider, { value: 72, color: 'secondary' })),
  'lcars-slider--secondary', '--value:72', 'lcars-slider__knob');

check('Compass', render(h(L.LcarsCompass, { heading: 87, mark: 21 })),
  'lcars-compass', '--heading:87', '087', 'MARK 21');

check('Helm', render(h(L.LcarsHelm, { warp: 6.2, impulse: 75, throttle: 80 })),
  '--warp:6.2', '--impulse:75', 'lcars-helm__bar--warp', '6.2', '75%');

check('MSD', render(h(L.LcarsMsd, { saucer: 'nominal', hull: 'warning', nacelleRight: 'critical' })),
  'lcars-msd__saucer', 'is-nominal', 'is-warning', 'is-critical');

check('Conduit', render(h(L.LcarsConduit, { load: 70, state: 'critical' })),
  'lcars-conduit--critical', '--load:70', 'lcars-conduit__plasma');

check('Waveform', render(h(L.LcarsWaveform, { values: [10, 50, 90], color: 'accent' })),
  'lcars-waveform--accent', '--value:90');

check('Toggle', render(h(L.LcarsToggle, { label: 'Deflector', defaultChecked: true, color: 'success' })),
  'lcars-toggle--success', 'type="checkbox"', 'Deflector');

check('Indicator', render(h(L.LcarsIndicator, { state: 'alert', label: 'Hull Breach' })),
  'lcars-indicator--alert', 'lcars-indicator__light', 'Hull Breach');

check('Alert', render(h(L.LcarsAlert, { condition: 'red', flash: true, text: 'Red Alert' })),
  'lcars-alert--red', 'lcars-alert--flash', 'Red Alert');

check('Transporter (progress)', render(h(L.LcarsTransporter, { subject: '◊', progress: 40 })),
  'lcars-transporter--progress', '--progress:40', 'lcars-transporter__beam');

check('Root theme + Bar', render(h(L.Lcars, { theme: 'klingon' }, h(L.LcarsBar, { color: 'primary', cap: 'left' }))),
  'lcars lcars-theme-klingon', 'lcars-bar--primary', 'cap-left');

const bg = render(h(L.LcarsBarGraph, { values: [10, 50, 90] }));
check('BarGraph (3 bars)', bg, '--value:10', '--value:50', '--value:90');
if ((bg.match(/lcars-bargraph__bar/g) || []).length !== 3) {
  failures++;
  console.error('✗ BarGraph bar count !== 3');
} else console.log('✓ BarGraph bar count');

console.log(failures ? `\nVERIFY FAILED (${failures})` : '\nVERIFY PASSED');
process.exit(failures ? 1 : 0);
