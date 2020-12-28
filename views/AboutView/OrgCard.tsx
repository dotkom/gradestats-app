import { GithubOrg } from 'common/api/github/repo';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import React, { FC } from 'react';
import cx from 'classnames';

import styles from './org-card.module.scss';

interface Props {
  className?: string;
  org: GithubOrg;
}

export const OrgCard: FC<Props> = ({ org, className }) => {
  return (
    <a className={cx(styles.card, className)} href={org.url} target="_blank" rel="noopener noreferrer">
      <img className={styles.image} src={org.avatarUrl} alt={`${org.name} logo`} />
      <Heading className={styles.name} as="h4" size="h5">
        {org.name}
      </Heading>
      <div className={styles.content}>
        <Text>{org.location}</Text>
        <Text>{org.email}</Text>
        <Text>{org.publicReposCount}</Text>
      </div>
      <Text className={styles.description}>{org.description}</Text>
    </a>
  );
};
