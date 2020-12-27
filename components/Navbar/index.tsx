import Link from 'next/link';
import React, { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import cx from 'classnames';

import styles from './navbar.module.scss';

const NAVBAR_ITEMS = [
  { href: '/', name: 'Emner', className: styles.courses },
  { href: '/about', name: 'Om siden', className: styles.about },
  { href: '/login', name: 'Logg inn', className: styles.login },
];

interface Props {
  className?: string;
}

export const Navbar: FC<Props> = ({ className }) => {
  return (
    <nav className={cx(styles.navbar, className)}>
      <div className={styles.content}>
        <Link href="/">
          <a>
            <Heading className={styles.pageName} as="h1">
              Grades.no
            </Heading>
          </a>
        </Link>
        <ul className={styles.linksList}>
          {NAVBAR_ITEMS.map(({ href, name, className }) => (
            <li key={href} className={className}>
              <Link href={href}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
