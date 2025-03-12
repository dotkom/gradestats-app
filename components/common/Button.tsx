import type { ButtonHTMLAttributes, FC, RefObject } from 'react';

import cx from 'classnames';

import styles from './button.module.scss';

type Variant = 'button' | 'link';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variant;
  disabled?: boolean;
  active?: boolean;
  invertedActive?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
}

export const Button: FC<Props> = ({
  className,
  ref,
  type = 'button',
  variant = 'button',
  onClick,
  children,
  disabled = false,
  active = false,
  invertedActive = false,
  ...props
}) => {
  return (
    <button
      className={cx(className, styles.base, {
        [styles.buttonVariant]: variant === 'button',
        [styles.linkVariant]: variant === 'link',
        [styles.disabled]: disabled,
        [styles.active]: active,
        [styles.inverted]: invertedActive,
      })}
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
