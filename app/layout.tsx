import Script from 'next/script';
import { GA_TRACKING_ID } from 'common/constants';

import siteLinksSearch from './site-search.json';
import { Metadata, Viewport } from 'next';
import React from 'react';
// import * as Sentry from '@sentry/node';

// import { SENTRY_DSN } from 'common/constants';
import { Navbar } from 'components/Navbar';
import { Alert } from 'components/Alert';
import { Footer } from 'components/Footer';

import 'react-alice-carousel/lib/scss/alice-carousel.scss';
import 'cssremedy/css/remedy.css';
import 'cssremedy/css/reminders.css';
import 'cssremedy/css/quotes.css';
import 'common/styles/global.scss';
import 'common/styles/resets.scss';
import 'common/styles/carousel.scss';

import styles from './_app.module.scss';
import { SWRProvider } from './swr-provider';
import SessionProvider from './session-provider';
import { getSession } from 'next-auth/react';

// Sentry.init({
//   dsn: SENTRY_DSN ?? undefined,
// });

// const getPathFromUrl = (url: string) => {
//     return url.split(/[?#]/)[0];
// };

// let previousPath = '';

// Router.events.on('routeChangeComplete', (url: string) => {
//     const newPath = getPathFromUrl(url);
//     if (newPath !== previousPath) {
//         pageView(url);
//     }
//     previousPath = newPath;
// });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  icons: [
    { url: '/icons/icon-64.png', sizes: '64x64', type: 'image/png' },
    { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
  ],
  manifest: '/manifest.json',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return Promise.resolve(
    <html lang="no">
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
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
