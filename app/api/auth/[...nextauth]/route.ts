import type { FeideProfile } from '../../../../common/auth/utils';
import { FEIDE_AUTH_ENDPOINT, FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET } from 'common/constants';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { OIDC_CLIENT_NAME } from 'common/auth/utils';
import { Requests } from 'common/requests';
import { getUserDetailApiUrl } from 'common/urls';
import type { GradesUser, LoggedInUser } from 'models/User';
import type { UserData } from 'types/next-auth';

const FEIDE_SCOPES = 'profile userid-feide email groups userid openid';

const authOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (!session.user?.email || !session.user?.name) {
        return session;
      }
      const data = token as unknown as UserData;
      const { accessToken, email_verified, picture, sub } = data;

      const requests = new Requests({ accessToken, useAuthentication: true });
      const username = session.user?.email?.split('@')[0];
      const gradesUser = await requests.get<GradesUser>(getUserDetailApiUrl(username!));
      const user: LoggedInUser = {
        fullName: session.user.name,
        username,
        email: session.user.email,
        emailVerified: email_verified,
        id: sub,
        image: picture,
        accessToken,
        expiresAt: Date.parse(session.expires),
        dateJoined: gradesUser.date_joined,
        isActive: gradesUser.is_active,
        isStaff: gradesUser.is_staff,
        isSuperuser: gradesUser.is_superuser,
      };
      session.user = user;
      return session;
    },
    jwt: async ({ token, account, profile }) => {
      if (account && account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve({ ...token, ...profile });
    },
  },
  providers: [
    {
      id: OIDC_CLIENT_NAME,
      name: 'Feide',
      type: 'oauth',
      version: '2.0',
      authorization: {
        params: {
          scope: FEIDE_SCOPES,
          grant_type: 'authorization_code',
        },
      },
      wellKnown: `${FEIDE_AUTH_ENDPOINT}/.well-known/openid-configuration`,
      checks: ['pkce', 'state'],
      profileUrl: `${FEIDE_AUTH_ENDPOINT}/openid/userinfo`,
      profile: (profile: FeideProfile) => {
        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          email: profile.email,
        };
      },
      clientId: FEIDE_CLIENT_ID,
      clientSecret: FEIDE_CLIENT_SECRET,
      idToken: true,
    },
  ],
} satisfies AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
