'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { AnimatedFailIcon } from 'components/Graphics/AnimatedFailIcon';
import { ReportDialogButton } from 'components/Report/ReportDialogButton';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './error-view.module.scss';

const TEXT = {
  TITLE: 'Det har skjedd en uventet feil!',
  DEFAULT_MESSAGE: '',
  REPORT_TEXT: `
    Fortell oss gjerne hvordan du kom frem til denne siden, slik at vi kan løse problemene.
    Hvis feilmeldingsskjemaet ikke virker kan du sende e-post direkte til dotkom@online.ntnu.no.`,
  REPORT_BUTTON: 'Meld feil',
};

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const statusCode = error.digest ? 500 : 0;
  const message = error.message;

  return (
    <>
      <title>
        {TEXT.TITLE}
        {statusCode ? ` (${statusCode})` : null}
      </title>
      <meta property="og:title" content={`${TEXT.TITLE} ${statusCode ? ` (${statusCode})` : null}`} />
      <meta name="description" content={message ?? TEXT.DEFAULT_MESSAGE} />
      <meta property="og:description" content={message ?? TEXT.DEFAULT_MESSAGE} />
      <section className={styles.container}>
        <Heading as="h1">
          {TEXT.TITLE}
          {statusCode ? ` (${statusCode})` : null}
        </Heading>
        <AnimatedFailIcon className={styles.illustration} />
        <Text>
          {message ?? TEXT.DEFAULT_MESSAGE} {TEXT.REPORT_TEXT}
        </Text>
        <ReportDialogButton className={styles.reportButton}>{TEXT.REPORT_BUTTON}</ReportDialogButton>
      </section>
    </>
  );
}
