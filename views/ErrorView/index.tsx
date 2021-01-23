import { AnimatedFailIcon } from 'components/Graphics/AnimatedFailIcon';
import { ReportDialogButton } from 'components/Report/ReportDialogButton';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import Head from 'next/head';
import { FC } from 'react';

import styles from './error-view.module.scss';

interface Props {
  message?: string;
  statusCode?: number | string;
}

const TEXT = {
  TITLE: 'Det har skjedd en uventet feil!',
  DEFAULT_MESSAGE: '',
  REPORT_TEXT: `
    Fortell oss gjerne hvordan du kom frem til denne siden, slik at vi kan løse problemene. 
    Hvis feilmeldingsskjemaet ikke virker kan du sende e-post direkte til dotkom@online.ntnu.no.`,
  REPORT_BUTTON: 'Meld feil',
};

export const ErrorView: FC<Props> = ({ statusCode, message }) => {
  return (
    <>
      <Head>
        <title>
          {TEXT.TITLE}
          {statusCode ? ` (${statusCode})` : null}
        </title>
        <meta property="og:title" content={`${TEXT.TITLE} ${statusCode ? ` (${statusCode})` : null}`} />
        <meta name="description" content={message ?? TEXT.DEFAULT_MESSAGE} />
        <meta property="og:description" content={message ?? TEXT.DEFAULT_MESSAGE} />
      </Head>
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
};
