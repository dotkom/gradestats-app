import type { LoggedInUser } from 'models/User';
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { ssrAuthMiddleware } from 'common/auth/middleware';

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
    await ssrAuthMiddleware(ctx);
    const request = ctx.req as typeof ctx.req & { user?: LoggedInUser };
    const user = request.user || null;
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
