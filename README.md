# ThemeShift UI

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://github.com/adamhutch/themeshift-ui/actions/workflows/ci.yml/badge.svg)
![Coverage](https://codecov.io/gh/adamhutch/themeshift-ui/graph/badge.svg)
![npm](https://img.shields.io/npm/v/@themeshift/ui)
![Components](https://img.shields.io/badge/components-2-blue.svg)

ThemeShift UI is a React UI framework built around design tokens and theme-aware styling. ThemeShift makes creating your own theme-aware components easy as pie.

## Overview

ThemeShift UI is designed for apps that want:

- React components with sensible defaults
- themeable styles powered by CSS variables
- design-token-driven customization
- per-component imports instead of a single all-in bundle

ThemeShift UI includes:

- React components from `@themeshift/ui/components/*`
- base styles from `@themeshift/ui/css/base.css`
- default token values from `@themeshift/ui/css/tokens.css`
- token source files and `theme-contract.json` for ThemeShift-aware overrides

## Installation

```bash
npm install @themeshift/ui react react-dom
```

If you want to override the default token values with your own ThemeShift tokens, also install the Vite plugin:

```bash
npm install -D @themeshift/vite-plugin-themeshift
```

## Usage

Import the components you need directly:

```tsx
import { Button } from '@themeshift/ui/components/Button';
import '@themeshift/ui/css/base.css';
import '@themeshift/ui/css/tokens.css';

export function Example() {
  return <Button>Click me</Button>;
}
```

Each component loads its own CSS automatically. You only need to import:

- `@themeshift/ui/css/base.css` for shared base styles
- `@themeshift/ui/css/tokens.css` for the package's default token values

## Theming

ThemeShift UI uses CSS variables for theming. Things like typography, spacing, and component colors are all driven by token-based custom properties.

If you are happy with the default theme, import:

```tsx
import '@themeshift/ui/css/tokens.css';
```

If you want to override the defaults, generate your own token CSS in your app with `@themeshift/vite-plugin-themeshift` and use `@themeshift/ui` as the starting point:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeShift } from '@themeshift/vite-plugin-themeshift';

export default defineConfig({
  plugins: [
    react(),
    themeShift({
      extends: ['@themeshift/ui'],
      cssVarPrefix: 'themeshift',
    }),
  ],
});
```

In that setup, your app-level `tokens/*.json` files override the default values from ThemeShift UI without needing to rebuild this package’s Sass.

## Available Imports

ThemeShift UI currently includes:

- `@themeshift/ui/components/Button`
- `@themeshift/ui/components/Heading`
- `@themeshift/ui/css/base.css`
- `@themeshift/ui/css/tokens.css`
- `@themeshift/ui/theme-contract.json`
- `@themeshift/ui/tokens/*`

CSS variable names use the `--themeshift-*` namespace to avoid collisions with application-level custom properties.

## Notes

- The npm badge is still a placeholder until the package is published.
- The component count badge reflects the current number of published components.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
