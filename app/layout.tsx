import Script from 'next/script';

import siteLinksSearch from './site-search.json';
import React from 'react';

import { Navbar } from 'components/Navbar';
import { Alert } from 'components/Alert';
import { Footer } from 'components/Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'cssremedy/css/remedy.css';
import 'cssremedy/css/reminders.css';
import 'cssremedy/css/quotes.css';
import 'common/styles/global.scss';
import 'common/styles/resets.scss';
import 'common/styles/carousel.scss';

import styles from './_app.module.css';
import { SWRProvider } from './swr-provider';
import SessionProvider from './session-provider';
import { getSession } from 'next-auth/react';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html lang="no">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/icons/icon-64.png" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ffffff" />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteLinksSearch),
        }}
      />
      <Script defer data-domain="grades.no" src="https://plausible.io/js/script.js"></Script>

      <body>
        <SessionProvider session={session}>
          <SWRProvider>
            <div className={styles.app}>
              <Navbar className={styles.header} />
              <main className={styles.main}>
                <noscript>
                  <Alert type="info">
                    Denne nettsiden bruker JavaScript for all interaktivitet, for å dra full nytte av nettsiden må du
                    derfor aktivere JavaScript.
                  </Alert>
                </noscript>
                {children}
              </main>
              <Footer className={styles.footer} />
            </div>
          </SWRProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
