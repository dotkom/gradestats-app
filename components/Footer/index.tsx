import { Text } from 'components/Typography/Text';
import { FC } from 'react';
import cx from 'classnames';

import styles from './footer.module.scss';

import pkg from 'package.json';

const MAIN_MESSAGE = `Til studentene ved NTNU, med kjærlighet, Online <3`;

interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className={cx(styles.footer, className)}>
      <Text>{MAIN_MESSAGE}</Text>
      <Text>Versjon: {pkg.version}</Text>
    </footer>
  );
};
