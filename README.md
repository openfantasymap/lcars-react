# @openfantasymap/lcars-react

React components + hooks for the **LCARS** design system — thin, typed wrappers
over [`@openfantasymap/lcars-core`](../lcars-lib) (the Stylus/CSS + data-binding
runtime). No styling lives here; this package maps props → classes / CSS
variables and adds React-idiomatic reactivity.

## Install

```bash
npm install @openfantasymap/lcars-react @openfantasymap/lcars-core react react-dom
```

Load the core stylesheet once, and wrap your UI in `<Lcars>` (or any element
with `class="lcars"`):

```tsx
import '@openfantasymap/lcars-core/dist/lcars.css';
import { Lcars, LcarsButton, LcarsGauge } from '@openfantasymap/lcars-react';

export function App() {
  return (
    <Lcars theme="tng">
      <LcarsGauge value={68} color="primary" label="Shields" />
      <LcarsButton color="danger" shape="rounded" onClick={engage}>Engage</LcarsButton>
    </Lcars>
  );
}
```

`<Lcars theme="…">` applies a theme/faction skin: `tng · picard · ds9 · voyager
· klingon · romulan · cardassian · ferengi`.

## Components

Every core component has a wrapper, grouped by category:

- **Layout** — `Lcars`, `LcarsRow`, `LcarsColumn`, `LcarsPanel`, `LcarsApp` (+ `…Sidebar/Header/Content`), `LcarsSpacer`, `LcarsGrow`
- **Primitives** — `LcarsElbow`, `LcarsBar`, `LcarsBarGroup`, `LcarsBarVertical`, `LcarsBracket`, `LcarsTextBox`, `LcarsReadout`
- **Tools** — `LcarsButton`, `LcarsToggle`, `LcarsSlider`, `LcarsKeypad` (+ `LcarsKeypadKey`), `LcarsIndicator`
- **Systems** — `LcarsGauge`, `LcarsBarGraph`, `LcarsDataCascade`, `LcarsWarpCore`, `LcarsAlert`
- **Navigation** — `LcarsNav` (+ `Item/Spacer/Group`), `LcarsTabs` (+ `LcarsTab`), `LcarsBreadcrumb` (+ `LcarsCrumb`)
- **Conn** — `LcarsCompass`, `LcarsScanner` (+ `LcarsScannerContact`), `LcarsStarmap` (+ `Star/Ship/Waypoint/Course/Label`), `LcarsHelm`
- **Engineering** — `LcarsConduit`, `LcarsPower` (+ `LcarsPowerRow`), `LcarsMsd`
- **Comms** — `LcarsComms` (+ `LcarsCommsChannel`), `LcarsWaveform`, `LcarsHail`
- **Transporter** — `LcarsTransporterPad`, `LcarsTransporter`
- **Controls** — `LcarsDpad` (8-way directional pad)
- **Overview** — `LcarsOverview` (annotated-SVG schematic)

Data-driven components take their value as a prop (mapped to a CSS variable):

```tsx
<LcarsSlider value={72} color="secondary" showValue />
<LcarsCompass heading={87} mark={21} />
<LcarsHelm warp={6.2} impulse={75} throttle={80} readouts={[{label:'ETA', value:'00:14'}]} />
<LcarsMsd saucer="nominal" hull="warning" nacelleRight="critical" />
```

## Hooks (live data)

Reactivity is built on the core store via `useSyncExternalStore`:

```tsx
import { useLcarsStore, useLcarsValue, useSimulate } from '@openfantasymap/lcars-react';

function Bridge() {
  const store = useLcarsStore({ shields: 98, heading: 87 });
  useSimulate(store, { shields: [20, 100], heading: { min: 0, max: 359, step: 8, wrap: true } });

  const shields = useLcarsValue<number>(store, 'shields');
  const heading = useLcarsValue<number>(store, 'heading');
  return (
    <Lcars>
      <LcarsGauge value={shields} label="Shields" color={shields < 30 ? 'danger' : 'primary'} />
      <LcarsCompass heading={heading} />
    </Lcars>
  );
}
```

- `useLcarsStore(init)` — create/memoise a store (or adopt an existing one)
- `useLcarsValue(store, key)` — subscribe to one key
- `useLcarsValues(store, keys)` — subscribe to several
- `useSimulate(store, spec)` — demo telemetry for the component's lifetime
- `useLcarsBind(store)` — a ref that binds raw `data-bind-*` markup / inline SVG

Wire a real feed by calling `store.set(...)` from MQTT/WebSocket/etc.

## Directional pad

```tsx
<LcarsDpad onSelect={(dir) => console.log(dir)} />  // dir: 'N' | 'NE' | … | 'NW'
```

## Config-driven rendering

Describe a screen as JSON and render it through a widget registry. Structural
types (`row`/`column`/`panel`/`spacer`/`grow`) recurse over `content`; any other
`type` resolves through the registry. (Angular inputs/outputs/events/text → React
`props`/`children`.)

```tsx
import { LcarsRender, type LcarsWidgetRegistry } from '@openfantasymap/lcars-react';

const registry: LcarsWidgetRegistry = {
  button: { component: LcarsButton, props: (n) => ({ color: n.color, onClick: () => fire(n.action) }), children: (n) => n.label },
  gauge:  { component: LcarsGauge,  props: (n) => ({ value: n.value, label: n.label }) },
};

const screen = {
  type: 'row', fill: true,
  content: [
    { type: 'gauge', value: 72, label: 'Shields' },
    { type: 'spacer' },
    { type: 'button', color: 'danger', label: 'Red Alert', action: 'alert' },
  ],
};

<LcarsRender node={screen} registry={registry} />
```

## Overview (annotated SVG)

```tsx
import svg from './deck.svg?raw'; // or a URL string

<LcarsOverview svg={svg} title="Deck 5" autoConnect
  onSelect={(id) => console.log(id)} />
```

`autoConnect` seeds + binds a store from the SVG's annotations (see core docs).
Pass your own store via `store={…}` to drive it from app state.

## Build

```bash
npm run build       # tsup → dist (ESM + CJS + .d.ts)
npm run typecheck   # tsc --noEmit
npm run verify      # SSR render sanity checks
```

Targets React ≥ 18 (peer). Builds on Node ≥ 16.

## Releasing

`.github/workflows/publish.yml` publishes to **npm (public)** on a `v*` tag
(provenance enabled). Add the repo secret **`NPM_TOKEN`**. CI builds against the
**published** `@openfantasymap/lcars-core` (it swaps the local `file:` dev link
for a real version — override via the workflow's `core-version` input), so
publish core first.

```bash
npm version patch && git push --follow-tags
```
