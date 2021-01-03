import React, { ButtonHTMLAttributes, FC } from 'react';

import cx from 'classnames';

import styles from './button.module.scss';
import { trackEvent } from 'common/analytics';
import { extractTextFromElement } from 'common/utils/react';

type Variant = 'button' | 'link';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disableTracking?: boolean;
  variant?: Variant;
}

export const Button: FC<Props> = ({
  className,
  disableTracking = false,
  type = 'button',
  variant = 'button',
  onClick,
  children,
  ...props
}) => {
  const handleClick: typeof onClick = (...props) => {
    onClick?.(...props);
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
      })}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
