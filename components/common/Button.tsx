import React, { ButtonHTMLAttributes, FC } from 'react';

import cx from 'classnames';

import styles from './button.module.scss';
import { trackEvent } from 'common/analytics';
import { extractTextFromElement } from 'common/utils/react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disableTracking?: boolean;
}

export const Button: FC<Props> = ({
  className,
  disableTracking = false,
  type = 'button',
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
    <button className={cx(className, styles.button)} type={type} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
