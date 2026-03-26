import React from 'react';

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.ComponentPropsWithoutRef<'h1'>;

const levelElementMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export const Heading = ({
  children,
  level = 1,
  ...headingProps
}: HeadingProps) => {
  return React.createElement(levelElementMap[level], headingProps, children);
};
