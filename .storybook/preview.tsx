import * as React from 'react';
import type { Preview } from '@storybook/react';
import '@openfantasymap/lcars-core/css';
import { Lcars, type LcarsTheme } from '../src';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'LCARS theme / faction skin',
    defaultValue: 'tng',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'tng', title: 'Federation · TNG' },
        { value: 'picard', title: 'Federation · Picard' },
        { value: 'ds9', title: 'Federation · DS9' },
        { value: 'voyager', title: 'Federation · Voyager' },
        { value: 'klingon', title: 'Klingon Empire' },
        { value: 'romulan', title: 'Romulan Star Empire' },
        { value: 'cardassian', title: 'Cardassian Union' },
        { value: 'ferengi', title: 'Ferengi Alliance' },
      ],
    },
  },
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { matchers: { color: /(color|background)$/i }, expanded: true },
    options: {
      storySort: {
        order: ['Introduction', 'Primitives', 'Tools', 'Systems', 'Navigation', 'Conn', 'Engineering', 'Communications', 'Transporter', 'Overview', 'Render', 'Realtime'],
      },
    },
  },
  decorators: [
    (Story, ctx) => (
      <Lcars
        theme={ctx.globals.theme as LcarsTheme}
        style={{ padding: '1.5rem', minHeight: '100vh', background: 'var(--lcars-bg)' }}
      >
        <Story />
      </Lcars>
    ),
  ],
};

export default preview;
