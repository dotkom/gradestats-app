import Link from 'next/link';
import type { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import cx from 'classnames';

import styles from './navbar.module.scss';
import { getServerSession } from 'next-auth';

interface Props {
  className?: string;
}

const getUser = async () => {
  const session = await getServerSession();
  return session?.user;
};

export const Navbar: FC<Props> = async ({ className }) => {
  const user = await getUser();
  return (
    <header className={cx(styles.navbar, className)}>
      <nav className={styles.content}>
        <Link href="/" className={styles.pageNameLink}>
          <Heading className={styles.pageName} as="p" size="h1">
            Grades.no
          </Heading>
        </Link>
        <ul className={styles.linksList}>
          <li className={styles.courses}>
            <Link href="/">Emner</Link>
          </li>
          <li className={styles.about}>
            <Link href="/about">Om siden</Link>
          </li>
          {!user ? (
            <li className={styles.login}>
              <Link href="/login">Logg inn</Link>
            </li>
          ) : (
            <li className={styles.login}>
              <Link href="/users/me">Bruker</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
