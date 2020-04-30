import * as Sentry from '@sentry/node';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';

import '../assets/css/gradestats.css';
import { pageView } from '../common/analytics';
import { SENTRY_DSN } from '../common/constants';
import { Navbar } from '../components/Navbar';

Sentry.init({
  dsn: SENTRY_DSN,
});

Router.events.on('routeChangeComplete', (url) => pageView(url));

const App = ({ Component, pageProps, err }) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  const modifiedPageProps = { ...pageProps, err };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Gradestats</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="container">
        <Component {...modifiedPageProps} />
      </div>
    </>
  );
};

export default App;
