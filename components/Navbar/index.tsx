import Link from 'next/link';
import React, { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import cx from 'classnames';

import styles from './navbar.module.scss';
import { useUser } from 'common/hooks/useUser';

interface Props {
  className?: string;
}

export const Navbar: FC<Props> = ({ className }) => {
  const [user] = useUser();
  return (
    <header className={cx(styles.navbar, className)}>
      <nav className={styles.content}>
        <Link href="/">
          <a>
            <Heading className={styles.pageName} as="p" size="h1">
              Grades.no
            </Heading>
          </a>
        </Link>
        <ul className={styles.linksList}>
          <li className={styles.courses}>
            <Link href="/">
              <a>Emner</a>
            </Link>
          </li>
          <li className={styles.about}>
            <Link href="/about">
              <a>Om siden</a>
            </Link>
          </li>
          {!user ? (
            <li className={styles.login}>
              <Link href="/login">
                <a>Logg inn</a>
              </Link>
            </li>
          ) : (
            <li className={styles.login}>
              <Link href="/users/me">
                <a>Bruker</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};