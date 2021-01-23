import { FC } from 'react';

import { AnimatedGraphIcon } from 'components/Graphics/AnimatedGraphIcon';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './fallback-view.module.scss';
import Head from 'next/head';

export const FallbackView: FC = () => {
  return (
    <>
      <Head>
        <title>Laster inn...</title> 
        <meta property="og:title" content="Laster inn..." />
        <meta name="description" content="Siden er straks klar!" />
        <meta property="og:description" content="Siden er straks klar!" />
      </Head>
      <section className={styles.container}>
        <Heading as="h1" size="h3">
          Laster inn
        </Heading>
        <AnimatedGraphIcon className={styles.loadingIcon} />
        <Text>Henter statistikk... Dette kan ta noen sekunder</Text>
      </section>
    </>
  );
};
