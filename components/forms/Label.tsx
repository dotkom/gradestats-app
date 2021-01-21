import React, { FC, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './label.module.scss';
import { Text } from 'components/Typography/Text';

interface OwnProps {
  label: string;
  description?: string;
  as?: keyof JSX.IntrinsicElements;
}

type Props = HTMLProps<HTMLLabelElement> & OwnProps;

export const Label: FC<Props> = ({ as: Element = 'label', className, label, description, children, ...props }) => {
  return (
    <Element className={cx(styles.label, className)} {...props}>
      <Text>{label}</Text>
      {description ? <small className={styles.description}>{description}</small> : null}
      {children}
    </Element>
  );
};
