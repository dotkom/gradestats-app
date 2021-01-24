import { getUser } from './utils';
import type { LoggedInUser } from 'models/User';
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = { [key: string]: any };

export const withUser = <Props extends AnyProps = AnyProps, Query extends ParsedUrlQuery = ParsedUrlQuery>(
  wrappedGetServerSideProps: (
    ctx: GetServerSidePropsContext<Query>,
    user: LoggedInUser | null
  ) => Promise<GetServerSidePropsResult<Props>> | GetServerSidePropsResult<Props>,
  redirect = true
): GetServerSideProps<Props, Query> => {
  const wrapper: GetServerSideProps<Props, Query> = async (ctx) => {
    const user = await getUser(ctx);
    const result = await wrappedGetServerSideProps(ctx, user);
    if (redirect && !user) {
      return {
        ...result,
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
    return result;
  };
  return wrapper;
};
