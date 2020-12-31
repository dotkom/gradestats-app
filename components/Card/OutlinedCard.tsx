import React, { forwardRef, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './outlined-card.module.scss';

type ElementProps = HTMLProps<HTMLElement>;

type Props = ElementProps & {
  as?: string;
};

export const OutlinedCard = forwardRef<HTMLElement, Props>(
  ({ className, as: Element = 'div', children, ...rest }, ref) => {
    // just a hack to not trip of typescript with the props of the `as` element.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = rest as any;
    return (
      <Element ref={ref} className={cx(className, styles.card)} {...props}>
        {children}
      </Element>
    );
  }
);

OutlinedCard.displayName = 'OutlinedCard';
