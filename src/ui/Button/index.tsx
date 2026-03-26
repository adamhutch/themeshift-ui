import classNames from 'classnames';

import styles from './Button.module.scss';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'constructive'
  | 'destructive';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: ButtonSize;
  intent?: ButtonIntent;
} & React.ComponentPropsWithoutRef<'button'>;

const sizeClassMap = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
} satisfies Record<ButtonSize, string>;

const intentClassMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  constructive: styles.constructive,
  destructive: styles.destructive,
} satisfies Record<ButtonIntent, string>;

export const Button = ({
  children,
  className,
  size = 'medium',
  intent = 'primary',
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    className={classNames(
      styles.container,
      sizeClassMap[size],
      intentClassMap[intent],
      className
    )}
  >
    {children}
  </button>
);
