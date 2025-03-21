import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import cx from 'classnames';

import styles from './basic-card.module.scss';

type ElementProps = HTMLProps<HTMLElement>;

type Props = ElementProps & {
  as?: string;
};

export const BasicCard = forwardRef<HTMLElement, Props>(
  ({ className, as: Element = 'div', children, ...rest }, ref) => {
    // just a hack to not trip of typescript with the props of the `as` element.

    const props = rest as any;
    return (
      <Element ref={ref} className={cx(className, styles.card)} {...props}>
        {children}
      </Element>
    );
  }
);

BasicCard.displayName = 'BasicCard';
