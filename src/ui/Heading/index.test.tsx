import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Heading } from './index';

describe('Heading', () => {
  it('renders children as a heading', () => {
    render(<Heading>Page title</Heading>);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page title' }),
    ).toBeInTheDocument();
  });

  it('defaults to an h1', () => {
    render(<Heading>Default heading</Heading>);

    expect(screen.getByRole('heading', { level: 1 })).toHaveProperty(
      'tagName',
      'H1',
    );
  });

  it.each([
    [1, 'H1'],
    [2, 'H2'],
    [3, 'H3'],
    [4, 'H4'],
    [5, 'H5'],
    [6, 'H6'],
  ] as const)('renders level %i as %s', (level, tagName) => {
    render(<Heading level={level}>Heading level {level}</Heading>);

    const heading = screen.getByRole('heading', {
      level,
      name: `Heading level ${level}`,
    });

    expect(heading).toHaveProperty('tagName', tagName);
  });

  it('forwards native heading props', () => {
    render(
      <Heading
        level={2}
        id="section-heading"
        className="heading-class"
        aria-describedby="heading-description"
      >
        Section title
      </Heading>,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Section title',
    });

    expect(heading).toHaveAttribute('id', 'section-heading');
    expect(heading).toHaveAttribute('aria-describedby', 'heading-description');
    expect(heading).toHaveClass('heading-class');
  });

  it('has no accessibility violations for representative levels', async () => {
    const { container, rerender } = render(<Heading>Accessible title</Heading>);

    expect(await axe(container)).toHaveNoViolations();

    rerender(<Heading level={3}>Accessible subsection</Heading>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
