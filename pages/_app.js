import Head from 'next/head';
import React from 'react';

import '../assets/css/gradestats.css';
import Link from 'next/link';

const NAVBAR_ITEMS = [
  { href: '/', name: 'Fag' },
  { href: '/about', name: 'Om siden' },
  { href: '/report', name: 'Rapporter feil' },
  { href: '/api-info', name: 'API' },
];

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
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
            <a className="navbar-brand" href="/index">
              grades.no
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navigationlist">
            <ul id="navbar" className="nav navbar-nav navbar-left">
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
                <input type="text" className="form-control tt-query" placeholder="Søk" name="query" id="query" />
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
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
