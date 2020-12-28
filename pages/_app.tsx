import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React, { FC } from 'react';

import { pageView } from 'common/analytics';
import { SENTRY_DSN } from 'common/constants';
import { Navbar } from 'components/Navbar';

import '@reach/dialog/styles.css';
import 'cssremedy/css/remedy.css';
import 'cssremedy/css/reminders.css';
import 'cssremedy/css/quotes.css';
import './global.scss';

import styles from './_app.module.scss';
import { Alert } from 'components/Alert';

Sentry.init({
  dsn: SENTRY_DSN ?? undefined,
});

const getPathFromUrl = (url: string) => {
  return url.split(/[?#]/)[0];
};

let previousPath = '';

Router.events.on('routeChangeComplete', (url: string) => {
  const newPath = getPathFromUrl(url);
  if (newPath !== previousPath) {
    pageView(url);
  }
  previousPath = newPath;
});

const ABOUT_GRADES = `
  Karakterstatisikk for emner ved Norges teknisk-naturvitenskapelige universitet.
`;

const TAGS = ['NTNU', 'Karakterstatistikk', 'Norwegian University of Science and Technology', 'Emneinformasjon'];

const App: FC<AppProps & { err: any }> = ({ Component, pageProps, err }) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  const modifiedPageProps = { ...pageProps, err };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>grades.no - karakterstatistikk</title> 
        <meta property="og:title" content="grades.no - karakterstatistikk" />
        <meta property="og:description" content={ABOUT_GRADES} />
        {TAGS.map((tag) => (
          <meta property="og:article:tag" content={tag} key={tag} />
        ))}
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.app}>
        <Navbar className={styles.header} />
        <main className={styles.main}>
          <noscript>
            <Alert type="info">
              Denne nettsiden bruker JavaScript for all interaktivitet, for å dra full nytte av nettsiden må du derfor
              aktivere JavaScript.
            </Alert>
          </noscript>
          <Component {...modifiedPageProps} />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default App;
