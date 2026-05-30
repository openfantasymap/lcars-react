import type { StorybookConfig } from '@storybook/react-vite';

// Storybook 9: essentials are built into core; add only the MCP addon.
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-mcp'],
  framework: { name: '@storybook/react-vite', options: {} },
  core: { disableTelemetry: true },
};

export default config;
