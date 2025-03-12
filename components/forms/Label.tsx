import type { FC, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './label.module.scss';
import { Text } from 'components/Typography/Text';

type ElementProps = HTMLProps<HTMLLIElement>;

type Props = ElementProps & {
  label: string;
  description?: string;
  as?: string;
};

export const Label: FC<Props> = ({ as: Element = 'label', className, label, description, children, ...rest }) => {
  // just a hack to not trip of typescript with the props of the `as` element.

  const props = rest as any;
  return (
    <Element className={cx(styles.label, className)} {...props}>
      <Text>{label}</Text>
      {description ? <small className={styles.description}>{description}</small> : null}
      {children}
    </Element>
  );
};
