import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import cx from 'classnames';

import styles from './link-card.module.scss';

type Props = HTMLProps<HTMLAnchorElement>;

export const LinkCard = forwardRef<HTMLAnchorElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <a ref={ref} className={cx(className, styles.card)} {...props} tabIndex={0}>
      {children}
    </a>
  );
});

LinkCard.displayName = 'LinkCard';
