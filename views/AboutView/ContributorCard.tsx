import Image from 'next/image';
import React, { FC } from 'react';
import cx from 'classnames';
import { GithubUser } from 'common/api/github/repo';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { LinkCard } from 'components/Card/LinkCard';

import styles from './constributor-card.module.scss';

interface Props {
  className?: string;
  user: GithubUser;
}

export const ContributorCard: FC<Props> = ({ className, user }) => {
  return (
    <LinkCard className={cx(styles.card, className)} href={user.url} target="_blank" rel="noopener noreferrer">
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={user.avatarUrl}
          alt={`${user.name ?? user.username} avatar`}
          width={60}
          height={60}
        />
      </div>
      <Heading className={styles.heading} as="p" size="h5">
        {user.name ?? user.username}
      </Heading>
      {user.name ? <Text className={styles.username}>{user.username}</Text> : null}
    </LinkCard>
  );
};
