import DefaultDocument, { Head, Main, NextScript, Html } from 'next/document';
import Script from 'next/script';
import { GA_TRACKING_ID } from 'common/constants';

import siteLinksSearch from './site-search.json';

class Document extends DefaultDocument {
  render() {
    return (
      <Html lang="no">
        <Head>
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
