import * as Sentry from '@sentry/node';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import '../assets/css/gradestats.css';
import { SENTRY_DSN } from '../common/constants';

const NAVBAR_ITEMS = [
  { href: '/', name: 'Fag' },
  { href: '/about', name: 'Om siden' },
  { href: '/report', name: 'Rapporter feil' },
  { href: '/api-info', name: 'API' },
];

Sentry.init({
  dsn: SENTRY_DSN,
});

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
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navigationlist"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="/index" as="/">
              <a className="navbar-brand">grades.no</a>
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              {NAVBAR_ITEMS.map(({ href, name }) => (
                <li key={href} className="navbar-item">
                  <Link href={href}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>

            <form
              className="navbar-form navbar-right"
              action="/search/"
              method="get"
              role="search"
              style={{ marginTop: '-5px' }}
            >
              <div className="input-group">
                <input type="text" className="form-control tt-query" placeholder="Søk" name="query" />
                <div className="input-group-btn">
                  <button className="btn btn-default" style={{ marginTop: '-5px' }} type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>

      <div className="container">
        <Component {...modifiedPageProps} />
      </div>
    </>
  );
};

export default App;
