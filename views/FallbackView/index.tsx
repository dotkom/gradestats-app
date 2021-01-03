import React, { FC } from 'react';

import { AnimatedGraphIcon } from 'components/Graphics/AnimatedGraphIcon';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './fallback-view.module.scss';

export const FallbackView: FC = () => {
  return (
    <section className={styles.container}>
      <Heading as="h1" size="h3">
        Laster inn
      </Heading>
      <AnimatedGraphIcon className={styles.loadingIcon} />
      <Text>Henter statistikk... Dette kan ta noen sekunder</Text>
    </section>
  );
};
