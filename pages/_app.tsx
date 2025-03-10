import * as Sentry from '@sentry/node';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { FC } from 'react';
import { Provider as SessionProvider } from 'next-auth/client';
import { SWRConfig } from 'swr';

import { pageView, trackEvent } from 'common/analytics';
import { SENTRY_DSN } from 'common/constants';
import { requests } from 'common/requests';
import { Navbar } from 'components/Navbar';
import { Alert } from 'components/Alert';
import { Footer } from 'components/Footer';

import 'common/polyfills';

import '@reach/dialog/styles.css';
import 'react-alice-carousel/lib/scss/alice-carousel.scss';
import 'cssremedy/css/remedy.css';
import 'cssremedy/css/reminders.css';
import 'cssremedy/css/quotes.css';
import 'common/styles/global.scss';
import 'common/styles/resets.scss';
import 'common/styles/carousel.scss';

import styles from './_app.module.scss';

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

type Props = AppProps & {
  err?: Error;
};

const App: FC<Props> = ({ Component, pageProps, err }) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  const modifiedPageProps = { ...pageProps, err };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icons/icon-64.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <script defer data-domain="grades.no" src="https://plausible.io/js/script.js"></script>
      </Head>
      <SessionProvider session={pageProps.session}>
        <SWRConfig value={{ fetcher: requests.get }}>
          <div className={styles.app}>
            <Navbar className={styles.header} />
            <main className={styles.main}>
              <noscript>
                <Alert type="info">
                  Denne nettsiden bruker JavaScript for all interaktivitet, for å dra full nytte av nettsiden må du
                  derfor aktivere JavaScript.
                </Alert>
              </noscript>
              <Component {...modifiedPageProps} />
            </main>
            <Footer className={styles.footer} />
          </div>
        </SWRConfig>
      </SessionProvider>
    </>
  );
};

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  trackEvent({
    action: 'metrics',
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    nonInteraction: true,
  });
}

export default App;
