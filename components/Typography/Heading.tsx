import type { FC, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './typography.module.scss';

type ElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface Props extends Omit<HTMLProps<HTMLHeadingElement>, 'size'> {
  as: ElementType;
  size?: ElementType;
}

const SIZES: Record<ElementType, string> = {
  h1: styles.heading1,
  h2: styles.heading2,
  h3: styles.heading3,
  h4: styles.heading4,
  h5: styles.heading5,
  h6: styles.heading6,
  p: styles.text,
};

export const Heading: FC<Props> = ({ as: Element, size = Element, className, ...props }) => {
  return <Element {...props} className={cx(className, SIZES[size])} />;
};
