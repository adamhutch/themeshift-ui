import { describe, expect, it } from 'vitest';
import { token, tokenValue } from '@themeshift/vite-plugin-themeshift/token';

import { tokenValues } from './token-values';

describe('ThemeShift token helpers', () => {
  it('reads authored token values from the generated manifest', () => {
    expect(tokenValue('layout.breakpoints.tablet', { values: tokenValues })).toBe('768px');
    expect(tokenValue('text.style.title', { values: tokenValues })).toEqual({
      fontFamily: "'Noto Sans Variable', 'Helvetica Neue', Arial, system-ui, sans-serif",
      fontSize: '1.25rem',
      lineHeight: '1.3',
      fontWeight: '400',
    });
  });

  it('returns undefined for missing authored token values', () => {
    expect(tokenValue('theme.text.base', { values: tokenValues })).toBeUndefined();
    expect(tokenValue('layout.breakpoints.tablet')).toBeUndefined();
  });

  it('reads computed CSS variable values from the document root by default', () => {
    document.documentElement.style.setProperty('--themeshift-theme-text-base', '#123456');

    expect(token('theme.text.base', { prefix: 'themeshift' })).toBe('#123456');
  });

  it('reads computed CSS variable values from an explicit element target', () => {
    const element = document.createElement('div');
    element.style.setProperty('--themeshift-layout-breakpoints-desktop', '1024px');
    document.body.appendChild(element);

    expect(token('layout.breakpoints.desktop', { prefix: 'themeshift', target: element })).toBe(
      '1024px',
    );
  });

  it('resolves a shadow root target through its host element', () => {
    const host = document.createElement('div');
    host.style.setProperty('--themeshift-accessibility-focus-ring-width', '3px');
    document.body.appendChild(host);

    const shadowRoot = host.attachShadow({ mode: 'open' });

    expect(
      token('accessibility.focus.ringWidth', { prefix: 'themeshift', target: shadowRoot }),
    ).toBe('3px');
  });
});
