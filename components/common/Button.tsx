import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import cx from 'classnames';

import styles from './button.module.scss';
import { trackEvent } from 'common/analytics';
import { extractTextFromElement } from 'common/utils/react';

type Variant = 'button' | 'link';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disableTracking?: boolean;
  variant?: Variant;
  disabled?: boolean;
  active?: boolean;
  invertedActive?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      disableTracking = false,
      type = 'button',
      variant = 'button',
      onClick,
      children,
      disabled = false,
      active = false,
      invertedActive = false,
      ...props
    },
    ref
  ) => {
    const handleClick: typeof onClick = (...params) => {
      onClick?.(...params);
      if (!disableTracking) {
        const value = extractTextFromElement(children);
        trackEvent({ action: 'click', category: 'button', value });
      }
    };

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
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
