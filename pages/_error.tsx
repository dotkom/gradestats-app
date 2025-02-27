// https://github.com/zeit/next.js/blob/b9c71d373c50f2cb7ba7830fdb2c202f9ad200c4/examples/with-sentry-simple/pages/_error.js
import { FC } from 'react';
import type { NextPageContext } from 'next';
import DefaultErrorPage, { ErrorProps } from 'next/error';
// import * as Sentry from '@sentry/node';
import { ErrorView } from 'views/ErrorView';

type Props = ErrorProps & {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
};

type ErrorFC = FC<Props> & {
  getInitialProps?: (ctx: NextPageContext) => Promise<Props>;
};

const CustomErrorPage: ErrorFC = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
    // err via _app.tsx so it can be captured
    // Sentry.captureException(err);
  }

  return <ErrorView statusCode={statusCode} />;
};

CustomErrorPage.getInitialProps = async (ctx) => {
  const { res, err } = ctx;
  const errorInitialProps: Props = await DefaultErrorPage.getInitialProps(ctx);

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }

  if (err) {
    // Sentry.captureException(err);
    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  // Sentry.captureException(new Error(`_error.tsx getInitialProps missing data at path: ${asPath}`));

  return errorInitialProps;
};

export default CustomErrorPage;
