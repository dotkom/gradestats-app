import { GithubUser } from 'common/api/github/repo';
import React, { FC } from 'react';
import cx from 'classnames';

import styles from './constributor-card.module.scss';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { OutlinedCard } from 'components/Card/OutlinedCard';

interface Props {
  className?: string;
  user: GithubUser;
}

export const ContributorCard: FC<Props> = ({ className, user }) => {
  return (
    <OutlinedCard
      as="a"
      className={cx(styles.card, className)}
      href={user.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className={styles.image} src={user.avatarUrl} alt={`${user.name ?? user.username} avatar`} />
      <Heading className={styles.heading} as="p" size="h5">
        {user.name ?? user.username}
      </Heading>
      {user.name ? <Text className={styles.username}>{user.username}</Text> : null}
    </OutlinedCard>
  );
};
