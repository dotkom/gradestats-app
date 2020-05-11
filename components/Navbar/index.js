import cx from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';

const NAVBAR_ITEMS = [
  { href: '/', name: 'Fag' },
  { href: '/about', name: 'Om siden' },
  { href: '/report', name: 'Rapporter feil' },
  { href: '/api-info', name: 'API' },
];

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className={cx('navbar-toggle', 'collapsed')}
            onClick={() => setShowMenu((current) => !current)}
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
        <div
          className={cx('navbar-collapse', 'collapse', {
            in: showMenu,
          })}
        >
          <ul className="nav navbar-nav navbar-left">
            {NAVBAR_ITEMS.map(({ href, name }) => (
              <li key={href} className="navbar-item">
                <Link href={href}>
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
