import Image from 'next/image';
import type { FC } from 'react';
import cx from 'classnames';
import type { GithubOrg } from 'common/api/github/repo';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { LinkCard } from 'components/Card/LinkCard';

import styles from './org-card.module.scss';

interface Props {
  className?: string;
  org: GithubOrg;
}

export const OrgCard: FC<Props> = ({ org, className }) => {
  return (
    <LinkCard className={cx(styles.card, className)} href={org.url} target="_blank" rel="noopener noreferrer">
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={org.avatarUrl} alt={`${org.name} logo`} width={100} height={100} />
      </div>
      <Heading className={styles.name} as="h3" size="h4">
        {org.name}
      </Heading>
      <div className={styles.content}>
        <Text>{org.location}</Text>
        <Text>{org.email}</Text>
        <Text>{org.publicReposCount}</Text>
      </div>
      <Text className={styles.description}>{org.description}</Text>
    </LinkCard>
  );
};
